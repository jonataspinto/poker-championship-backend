import { Request, Response } from "express";
import { IUser } from "../interfaces/User";
import { IIdProvider } from "../interfaces/IdProvider";
import { IDatabase } from "../interfaces/Database";
import { User } from "../domain/User";
import { BaseController } from "./BaseController";
import { DeliveryPodiumsByPlayer } from "../helpers/DeliveryPodiumsByPlayer";

export class UserController implements BaseController<IUser> {
  private UserDomain: User<IIdProvider>

  constructor(
    private dbAdapter: IDatabase<IUser>,
    idProvider: IIdProvider,
  ) {
    this.UserDomain = new User(idProvider, dbAdapter);
  }

  async save(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const user = this.UserDomain.create(data);
    const newUser = await this.dbAdapter.save(user);
    return response.status(200).json(newUser);
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    try {
      const list = await this.dbAdapter.getAll();

      const deliveryPodiumsByPlayer = new DeliveryPodiumsByPlayer(list as IUser[]);

      const mappedUsers = await deliveryPodiumsByPlayer.mapPodiumByPlayer();

      return response.status(200).json(mappedUsers);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async getById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const data = await this.dbAdapter.getById(id);
    return response.status(200).json(data);
  }

  async getByKey(request: Request, response: Response): Promise<Response> {
    const { key, value } = request.query;

    if (!key || !value) {
      return response.status(400).send();
    }

    const data = await this.dbAdapter.getByKey(key as string, value as string);
    return response.status(200).json(data);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const data = request.body;
    const updatedData = await this.dbAdapter.update(id, data);
    return response.json(updatedData);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deletedItemId = await this.dbAdapter.delete(id);
    return response.json(deletedItemId);
  }
}

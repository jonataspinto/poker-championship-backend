import { Request, Response } from "express";
import { IUser, IIdProvider, IDatabase } from "../interfaces";
import { User } from "../domain";
import { BaseController } from "./BaseController";
import { DeliveryPodiumsByPlayer } from "../helpers/DeliveryPodiumsByPlayer";

export class UserController implements BaseController<IUser> {
  private dbAdapter: IDatabase<IUser>;

  private idProvider: IIdProvider;

  constructor(
    dbAdapter: IDatabase<IUser>,
    idProvider: IIdProvider,
  ) {
    this.dbAdapter = dbAdapter;
    this.idProvider = idProvider;
  }

  async save(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const user = new User(data, this.idProvider);
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
      return response.status(400).json({ message: error });
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

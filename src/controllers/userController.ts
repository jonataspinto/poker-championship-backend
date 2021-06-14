import { Request, Response } from "express";
// import { User } from "@Domain";
// import { IUser, IDatabase, IIdProvider } from "@Interfaces";
import { IUser } from "../interfaces/User";
import { IIdProvider } from "../interfaces/IdProvider";
import { IDatabase } from "../interfaces/Database";
import { User } from "../domain/User";
import { BaseController } from "./BaseController";

export class UserController implements BaseController<IUser> {
  private UserDomain: User<IIdProvider>

  constructor(
    private dbAdapter: IDatabase<IUser>,
    idProvider: IIdProvider,
  ) {
    this.UserDomain = new User(idProvider);
  }

  async save(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const user = this.UserDomain.create(data);
    const newUser = await this.dbAdapter.save(user);
    return response.status(200).json(newUser);
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    const list = await this.dbAdapter.getAll();
    return response.status(200).json(list);
  }

  async getById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const data = await this.dbAdapter.getById(id);
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

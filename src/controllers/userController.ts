import { Request, Response } from "express";
import { SpaceDomain } from "../domain";
import { MongoAdapter } from "../adapters";
import { ISpace, Space, User } from "../models";

export class UserController {
  private dbAdapter = new MongoAdapter<ISpace>()

  private spaceDomain = new SpaceDomain(this.dbAdapter)

  constructor() {
    this.save = this.save.bind(this);
    this.getById = this.getById.bind(this);
    this.fetch = this.fetch.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async save(request: Request, response: Response) {
    const { spaceId } = request.query;

    const newUser = new User(request.body);

    const space: ISpace = await this.spaceDomain.getById(spaceId as string);

    space.users.push(newUser.get());

    const data = await this.spaceDomain.update(spaceId as string, {
      name: space.name,
      users: space.users,
      journeys: space.journeys,
      uuid: space.uuid,
    });
    response.send(data);
  }

  async fetch(request: Request, response: Response) {
    const { spaceId } = request.query;
    const space = await this.spaceDomain.getById(spaceId as string);

    response.send(space.users);
  }

  async getById(request: Request, response: Response) {
    const { spaceId } = request.query;
    const { id } = request.params;

    const space = await this.spaceDomain.getById(spaceId as string);

    const user = space.users.find((userFind) => userFind.uid === id);
    response.send(user);
  }

  async update(request: Request, response: Response) {
    const { spaceId } = request.query;
    const { id } = request.params;

    const space = await this.spaceDomain.getById(spaceId as string);

    const updateIndex = space.users.findIndex((user) => user.uid === id);

    space.users[updateIndex] = { ...space.users[updateIndex], ...request.body };

    const data = await this.spaceDomain.update(spaceId as string, {
      name: space.name,
      users: space.users,
      journeys: space.journeys,
      uuid: space.uuid,
    });

    response.send(data);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const data = await this.spaceDomain.delete(id);

    response.send(data);
  }
}

import { Request, Response } from "express";
import { SpaceDomain } from "../domain";
import { MongoAdapter } from "../adapters";
import { ISpace, Space } from "../models";

export class SpaceController {
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
    const newSpace = new Space(request.body);
    const data = await this.spaceDomain.save(newSpace.get());
    response.send(data);
  }

  async fetch(request: Request, response: Response) {
    const data = await this.spaceDomain.fetch();

    response.send(data);
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params;

    const data = await this.spaceDomain.getById(id as string);

    response.send(data);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    const data = await this.spaceDomain.update(id, request.body);

    response.send(data);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const data = await this.spaceDomain.delete(id);

    response.send(data);
  }
}

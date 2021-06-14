import { Request, Response } from "express";
import { Journey } from "@Domain";
import { IJourney, IDatabase, IIdProvider } from "@Interfaces";
import { BaseController } from "./BaseController";

export class JourneyController implements BaseController<IJourney> {
  private JourneyDomain: Journey<IIdProvider>

  constructor(
    private dbAdapter: IDatabase<IJourney>,
    idProvider: IIdProvider,
  ) {
    this.JourneyDomain = new Journey(idProvider);
  }

  async save(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const journey = this.JourneyDomain.create(data);
    const newJourney = await this.dbAdapter.save(journey);
    return response.status(200).json(newJourney);
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

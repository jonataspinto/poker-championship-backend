import { Request, Response } from "express";
import { IJourney } from "../interfaces/Journey";
import { IIdProvider } from "../interfaces/IdProvider";
import { IDatabase } from "../interfaces/Database";
import { Journey } from "../domain/Journey";
import { BaseController } from "./BaseController";
import { IAuth } from "../interfaces/Auth";
import { DeliveryPointsToPlayers } from "../helpers/DeliveryPointsToPlayers";

export class JourneyController implements BaseController<IJourney> {
  private JourneyDomain: Journey<IIdProvider>

  constructor(
    idProvider: IIdProvider,
    private dbAdapter: IDatabase<IJourney>,
    private auth: IAuth,
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
    try {
      const data = request.body;
      const { id } = request.params;
      const { hasClosed } = await this.dbAdapter.getById(id);
      if (hasClosed) {
        return response.status(400).json({ message: "jornada fechada!" });
      }
      const updatedData = await this.dbAdapter.update(id, data);
      return response.json(updatedData);
    } catch ({ message }) {
      return response.status(400).send({ message });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deletedItemId = await this.dbAdapter.delete(id);
    return response.json(deletedItemId);
  }

  async closeJourney(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { authorization } = request.headers;

      const journey = await this.dbAdapter.getById(id);

      const deliveryPointsToPlayers = new DeliveryPointsToPlayers(journey);

      if (journey.hasClosed) {
        return response.status(400).json({ message: "jornada fechada!" });
      }
      if (authorization) {
        const userId = await this.auth.getUuidByToken(authorization.split(" ")[1]);
        journey.hasClosed = true;
        journey.closedBy = userId;
      }

      const updatedData = await this.dbAdapter.update(id, journey);

      await deliveryPointsToPlayers.deliveryBiggestEliminator();

      return response.json(updatedData);
    } catch ({ message }) {
      return response.status(400).send({ message });
    }
  }
}

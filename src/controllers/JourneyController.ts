import { Request, Response } from "express";
import {
  IJourney, IIdProvider, IDatabase, IAuth,
} from "../interfaces";
import { Journey } from "../domain";
import { BaseController } from "./BaseController";
import { DeliveryPointsToPlayers } from "../helpers/DeliveryPointsToPlayers";

export class JourneyController implements BaseController<IJourney> {
  private idProvider: IIdProvider;

  private dbAdapter: IDatabase<IJourney>;

  private auth: IAuth;

  constructor(
    dbAdapter: IDatabase<IJourney>,
    auth: IAuth,
    idProvider: IIdProvider,
  ) {
    this.dbAdapter = dbAdapter;
    this.auth = auth;
    this.idProvider = idProvider;
  }

  async save(request: Request, response: Response): Promise<Response> {
    try {
      const data = request.body;

      const list = await this.dbAdapter.getAll("seasonId", data.seasonId);

      const journey = new Journey(
        {
          ...data,
          tag: Array.from(list as IJourney[]).length + 1,
        },
        this.idProvider,
      );

      const newJourney = await this.dbAdapter.save(journey);

      return response.status(200).json(newJourney);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    try {
      const { seasonId } = request.query;

      const list = await this.dbAdapter.getAll("seasonId", seasonId as string);

      const orderedList = Array.from(list as IJourney[]).sort((a, b) => (b.tag - a.tag));

      return response.status(200).json(orderedList);
    } catch (error) {
      return response.status(400).json(error);
    }
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

import { Request, Response } from "express";
import { Controller } from "./Controller";
import JourneysRepository from "../repositories/Journeys/JourneysRepository";
import { FirebaseAuthAdapter } from "../adapters/FirebaseAuthAdapter";

class JourneyController implements Controller {
  constructor(readonly auth: IAuth) {}

  async index(request: Request, response: Response) {
    const journeys = await JourneysRepository.findAll();

    const orderedList = Array.from(journeys).sort((a, b) => (b.tag - a.tag));

    response.json(orderedList);
  }

  async store(request: Request, response: Response) {
    const payload = request.body;

    const newJourney = await JourneysRepository.create(payload);

    response.status(201).json(newJourney);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const journey = await JourneysRepository.findById(id);

    if (!journey) {
      response.status(404).send({ error: "journey not found" });
      return;
    }
    response.json(journey);
  }

  async update(request: Request, response: Response) {
    const payload = request.body;
    const { id } = request.params;
    const journeyExists = await JourneysRepository.findById(id);

    if (!journeyExists) {
      response.status(404).send({ error: "journey not found" });
      return;
    }

    if (journeyExists.hasClosed) {
      response.status(400).send({ error: "this journey in closed" });
      return;
    }
    const updatedData = await JourneysRepository.update(id, payload);

    response.json(updatedData);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await JourneysRepository.delete(id);

    response.sendStatus(204);
  }

  async closeJourney(request: Request, response: Response) {
    const { id } = request.params;
    const { authorization } = request.headers;

    const journey = await JourneysRepository.findById(id);

    if (journey.hasClosed) {
      return response.status(400).json({ error: "this journey in closed" });
    }
    // const deliveryPointsToPlayers = new DeliveryPointsToPlayers(journey);

    if (authorization) {
      const userId = await this.auth.getUuidByToken(authorization.split(" ")[1]);
      journey.hasClosed = true;
      journey.closedBy = userId;
    }

    const updatedData = await JourneysRepository.update(id, journey);

    // await deliveryPointsToPlayers.deliveryBiggestEliminator();

    response.json(updatedData);
  }
}

export default new JourneyController(new FirebaseAuthAdapter());

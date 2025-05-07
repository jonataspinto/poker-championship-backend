import { Request, Response } from "express";
import { Controller } from "./Controller";
import { FirebaseAuthAdapter } from "../adapters/FirebaseAuthAdapter";
import { DeliveryPointsToPlayers } from "../helpers/";
import {
  journeysRepository,
  journeyTagsRepository,
  playersRepository
} from "../repositories";

class JourneyController implements Controller {
  auth: IAuth;

  constructor() {
    this.auth = new FirebaseAuthAdapter();

    this.closeJourney = this.closeJourney.bind(this);
  }

  async index(request: Request, response: Response) {
    const journeys = await journeysRepository.findAll();

    const orderedList = Array.from(journeys).sort((a, b) => b.tag - a.tag);

    response.json(orderedList);
  }

  async store(request: Request, response: Response) {
    const payload = request.body;

    const tag = await journeyTagsRepository.create(payload);

    const newJourney = await journeysRepository.create({
      ...payload,
      tag: tag.tagNumber,
      hasClosed: false,
      bestHand: null,
      closedBy: null,
      biggestEliminator: null,
      podium: null
    });

    response.status(201).json(newJourney);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const journey = await journeysRepository.findById(id);

    if (!journey) {
      response.status(404).json({ error: "journey not found" });
      return;
    }
    response.json(journey);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const payload = request.body;

    const journeyExists = await journeysRepository.findById(id);

    if (!journeyExists) {
      response.status(404).json({ error: "journey not found" });
      return;
    }

    if (journeyExists.hasClosed) {
      response.status(400).json({ error: "this journey is closed" });
      return;
    }

    const updatedData = await journeysRepository.update(id, payload);

    response.json(updatedData);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await journeysRepository.delete(id);

    response.sendStatus(204);
  }

  async closeJourney(request: Request, response: Response) {
    const { id } = request.params;
    const { authorization = "" } = request.headers;

    const journey = await journeysRepository.findById(id);

    if (journey.hasClosed) {
      response.status(400).json({ error: "this journey is closed" });
      return;
    }
    const deliveryPointsToPlayers = new DeliveryPointsToPlayers(journey);

    const useEmail = await this.auth.getEmailByToken(
      authorization.split("Bearer ")[1]
    );

    const player = await playersRepository.findByEmail(useEmail);

    if (!player) {
      response.status(404).json({ error: "player not found" });
      return;
    }

    journey.hasClosed = true;
    journey.closedBy = player.id;

    const updatedData = await journeysRepository.update(id, journey);

    await Promise.all([
      deliveryPointsToPlayers.deliveryPodium(),
      deliveryPointsToPlayers.deliveryBestHandPoints(),
      deliveryPointsToPlayers.deliveryBiggestEliminator()
    ]);

    response.json(updatedData);
  }
}

export default new JourneyController();

import { Request, Response } from "express";
import { Controller } from "./Controller";
import { DeliveryPointsToPlayers } from "../helpers/";

export class JourneyController implements Controller {
  private auth: IAuth;
  private journeysRepository: Repository<Journey, JourneyDTO>;
  private journeyTagsRepository: Repository<JourneyTag, JourneyTagDTO>;
  private playersRepository: Repository<Player, PlayerDTO>;

  constructor(
    auth: IAuth,
    journeysRepository: Repository<Journey, JourneyDTO>,
    journeyTagsRepository: Repository<JourneyTag, JourneyTagDTO>,
    playersRepository: Repository<Player, PlayerDTO>
  ) {
    this.auth = auth;
    this.journeysRepository = journeysRepository;
    this.journeyTagsRepository = journeyTagsRepository;
    this.playersRepository = playersRepository;
  }

  index = async (request: Request, response: Response) => {
    const journeys = await this.journeysRepository.findAll();

    const orderedList = journeys?.sort((a, b) => b.tag - a.tag);

    response.json(orderedList);
  };

  store = async (request: Request, response: Response) => {
    const payload = request.body;

    const tag = await this.journeyTagsRepository.create(payload);

    const newJourney = await this.journeysRepository.create({
      ...payload,
      tag: tag.tagNumber,
      hasClosed: false,
      bestHand: null,
      closedBy: null,
      biggestEliminator: null,
      podium: null
    });

    response.status(201).json(newJourney);
  };

  show = async (request: Request, response: Response) => {
    const { id } = request.params;

    const journey = await this.journeysRepository.findById(id);

    if (!journey) {
      response.status(404).json({ error: "journey not found" });
      return;
    }
    response.json(journey);
  };

  update = async (request: Request, response: Response) => {
    const { id } = request.params;
    const payload = request.body;

    const journeyExists = await this.journeysRepository.findById(id);

    if (!journeyExists) {
      response.status(404).json({ error: "journey not found" });
      return;
    }

    if (journeyExists.hasClosed) {
      response.status(400).json({ error: "this journey is closed" });
      return;
    }

    const updatedData = await this.journeysRepository.update(id, payload);

    response.json(updatedData);
  };

  delete = async (request: Request, response: Response) => {
    const { id } = request.params;

    await this.journeysRepository.delete(id);

    response.sendStatus(204);
  };

  closeJourney = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { authorization = "" } = request.headers;

    const journey = await this.journeysRepository.findById(id);

    if (journey.hasClosed) {
      response.status(400).json({ error: "this journey is closed" });
      return;
    }
    const deliveryPointsToPlayers = new DeliveryPointsToPlayers(journey);

    const useEmail = await this.auth.getEmailByToken(
      authorization.split("Bearer ")[1]
    );

    const player = await this.playersRepository?.findByEmail?.(useEmail);

    if (!player) {
      response.status(404).json({ error: "player not found" });
      return;
    }

    journey.hasClosed = true;
    journey.closedBy = player.id;

    const updatedData = await this.journeysRepository.update(id, journey);

    await Promise.all([
      deliveryPointsToPlayers.deliveryPodium(),
      deliveryPointsToPlayers.deliveryBestHandPoints(),
      deliveryPointsToPlayers.deliveryBiggestEliminator()
    ]);

    response.json(updatedData);
  };
}

import { Request, Response } from "express";
import { Controller } from "./Controller";
import { PlayerMapper } from "../mappers";
import { sanitizeObject, orderPlayersRanking } from "../utils";

export class PlayerController implements Controller {
  private playersRepository: Repository<Player, PlayerDTO>;

  constructor(playersRepository: Repository<Player, PlayerDTO>) {
    this.playersRepository = playersRepository;
  }

  index = async (request: Request, response: Response) => {
    const players = await this.playersRepository.findAll();

    const orderedListByPoints = orderPlayersRanking(players);

    const data = orderedListByPoints.map(PlayerMapper.toDomain);

    response.json(data);
  };

  store = async (request: Request, response: Response) => {
    const payload = sanitizeObject(
      PlayerMapper.toPersistence(request.body)
    ) as Player;

    if (!payload.name || !payload.email) {
      response.status(400).send({ error: "Name and Email is required" });
      return;
    }

    const playerExists = await this.playersRepository.findByEmail?.(
      payload.email
    );

    if (playerExists) {
      response.status(400).send({ error: "This email is already in use" });
      return;
    }

    const player = await this.playersRepository.create(payload);

    response.status(201).json(player);
  };

  show = async (request: Request, response: Response) => {
    let player = null;

    const { id } = request.params;

    if (id.includes("@")) {
      player = await this.playersRepository.findByEmail?.(id);
    } else {
      player = await this.playersRepository.findById(id);
    }

    if (!player) {
      response.status(404).send({ error: "Player not found" });
      return;
    }

    response.json(PlayerMapper.toDomain(player));
  };

  update = async (request: Request, response: Response) => {
    const { id } = request.params;

    const playerExists = await this.playersRepository.findById(id);

    if (!playerExists) {
      response.status(404).send({ error: "Player not found" });
      return;
    }

    const payload = sanitizeObject(
      PlayerMapper.toPersistence(request.body)
    ) as Player;

    const player = await this.playersRepository.update(id, payload);

    response.json(player);
  };

  delete = async (request: Request, response: Response) => {
    const { id } = request.params;

    const playerExists = await this.playersRepository.findById(id);

    if (!playerExists) {
      response.status(404).send({ error: "Player not found" });
      return;
    }

    await this.playersRepository.delete(id);

    response.sendStatus(204);
  };
}

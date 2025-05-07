import { Request, Response } from "express";
import { Controller } from "./Controller";
import { PlayerMapper } from "../mappers";
import { playersRepository } from "../repositories";
import { sanitizeObject, orderPlayersRanking } from "../utils";

export class PlayerController implements Controller {
  async index(request: Request, response: Response) {
    const players = await playersRepository.findAll();

    const orderedListByPoints = orderPlayersRanking(players);

    const data = orderedListByPoints.map(PlayerMapper.toDomain);

    response.json(data);
  }

  async store(request: Request, response: Response) {
    const payload = sanitizeObject(
      PlayerMapper.toPersistence(request.body)
    ) as Player;

    if (!payload.name || !payload.email) {
      response.status(400).send({ error: "Name and Email is required" });
      return;
    }

    const playerExists = await playersRepository.findByEmail(payload.email);

    if (playerExists) {
      response.status(400).send({ error: "This email is already in use" });
      return;
    }

    const player = await playersRepository.create(payload);

    response.status(201).json(player);
  }

  async show(request: Request, response: Response) {
    let player = null;

    const { id } = request.params;

    if (id.includes("@")) {
      player = await playersRepository.findByEmail(id);
    } else {
      player = await playersRepository.findById(id);
    }

    if (!player) {
      response.status(404).send({ error: "Player not found" });
      return;
    }

    response.json(PlayerMapper.toDomain(player));
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    const playerExists = await playersRepository.findById(id);

    if (!playerExists) {
      response.status(404).send({ error: "Player not found" });
      return;
    }

    const payload = sanitizeObject(
      PlayerMapper.toPersistence(request.body)
    ) as Player;

    const player = await playersRepository.update(id, payload);

    response.json(player);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const playerExists = await playersRepository.findById(id);

    if (!playerExists) {
      response.status(404).send({ error: "Player not found" });
      return;
    }

    await playersRepository.delete(id);

    response.sendStatus(204);
  }
}

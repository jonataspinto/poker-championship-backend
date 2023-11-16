import { Request, Response } from "express";
import { Controller } from "./Controller";
import PlayersRepository from "@/repositories/Players/PlayersRepository";

class PlayerController implements Controller {
  async index(request: Request, response: Response) {
    const players = await PlayersRepository.findAll();

    response.json(players);
  }

  async store(request: Request, response: Response) {
    const payload = request.body as IPlayer;
    const player = await PlayersRepository.create(payload);

    if (!payload.name || payload.email) {
      response.status(400).send({ error: "Name and Email is required" });
      return;
    }

    const playerExists = await PlayersRepository.findByEmail(payload.email);

    if (playerExists) {
      response.status(400).send({ error: "This email is already in use" });
      return;
    }

    response.status(201).json(player);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const player = await PlayersRepository.findById(id);

    if (!player) {
      response.status(404).send({ error: "Player not found" });
      return;
    }

    response.json(player);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const payload = request.body;

    const playerExists = await PlayersRepository.findById(payload.id);

    if (!playerExists) {
      response.status(404).send({ error: "Player not found" });
      return;
    }

    if (!payload.name || payload.email) {
      response.status(400).send({ error: "Name and Email is required" });
      return;
    }

    const playerExistsByEmail = await PlayersRepository.findByEmail(payload.email);

    if (playerExistsByEmail && playerExistsByEmail.id !== id) {
      response.status(400).send({ error: "This email is already in use" });
      return;
    }

    const player = await PlayersRepository.update(id, payload);

    response.json(player);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await PlayersRepository.delete(id);

    response.sendStatus(204);
  }
}

export default new PlayerController();

import { Request, Response } from "express";
import { Controller } from "./Controller";
import { seasonsRepository } from "../repositories";
import { FirebaseAuthAdapter } from "../adapters";

export class SeasonController implements Controller {
  private auth: IAuth;

  constructor() {
    this.auth = new FirebaseAuthAdapter();
  }

  async index(request: Request, response: Response) {
    const seasons = await seasonsRepository.findAll();

    const orderedList = seasons.sort((a, b) => b.tag - a.tag);

    response.json(orderedList);
  }

  async store(request: Request, response: Response) {
    const payload = request.body as ISeason;

    const seasons = await seasonsRepository.findAll();

    const hasOpenSeason = !!seasons.find((season) => !season.hasClosed);

    if (hasOpenSeason) {
      response.status(400).send({ error: "has opened season" });
      return;
    }

    const newSeason = await seasonsRepository.create(payload);

    response.status(201).json(newSeason);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const season = await seasonsRepository.findById(id);

    if (!season) {
      response.status(404).send({ error: "season not found" });
      return;
    }

    response.json(season);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const payload = request.body;

    const seasonExists = await seasonsRepository.findById(id);

    if (!seasonExists) {
      response.status(404).send({ error: "season not found" });
      return;
    }

    if (seasonExists.hasClosed) {
      response.status(400).json({ error: "this season is closed" });
      return;
    }

    const updatedSeason = await seasonsRepository.update(id, payload);

    response.json(updatedSeason);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await seasonsRepository.delete(id);

    response.sendStatus(204);
  }

  async closeSeason(request: Request, response: Response) {
    const { id } = request.params;
    const { authorization } = request.headers;

    const season = await seasonsRepository.findById(id);

    if (!season) {
      response.status(404).send({ error: "Season not found" });
      return;
    }

    if (season.hasClosed) {
      response.status(400).json({ error: "This season is closed" });
      return;
    }

    if (!authorization) {
      response.status(403).send({ error: "authorization token is required" });
      return;
    }

    const userId = await this.auth.getUuidByToken(authorization);

    season.hasClosed = true;
    season.closedBy = userId;

    const updatedSeason = await seasonsRepository.update(id, season);

    response.json(updatedSeason);
  }
}

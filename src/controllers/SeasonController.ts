import { Request, Response } from "express";
import { Controller } from "./Controller";

export class SeasonController implements Controller {
  private auth: IAuth;
  private seasonsRepository: Repository<Season, SeasonDTO>;

  constructor(auth: IAuth, seasonsRepository: Repository<Season, SeasonDTO>) {
    this.auth = auth;
    this.seasonsRepository = seasonsRepository;
  }

  index = async (request: Request, response: Response) => {
    const seasons = await this.seasonsRepository.findAll();

    const orderedList = seasons.sort((a, b) => b.tag - a.tag);

    response.json(orderedList);
  };

  store = async (request: Request, response: Response) => {
    const payload = request.body as Season;

    const seasons = await this.seasonsRepository.findAll();

    const hasOpenSeason = !!seasons.find((season) => !season.hasClosed);

    if (hasOpenSeason) {
      response.status(400).send({ error: "has opened season" });
      return;
    }

    const newSeason = await this.seasonsRepository.create(payload);

    response.status(201).json(newSeason);
  };

  show = async (request: Request, response: Response) => {
    const { id } = request.params;

    const season = await this.seasonsRepository.findById(id);

    if (!season) {
      response.status(404).send({ error: "season not found" });
      return;
    }

    response.json(season);
  };

  update = async (request: Request, response: Response) => {
    const { id } = request.params;
    const payload = request.body;

    const seasonExists = await this.seasonsRepository.findById(id);

    if (!seasonExists) {
      response.status(404).send({ error: "season not found" });
      return;
    }

    if (seasonExists.hasClosed) {
      response.status(400).json({ error: "this season is closed" });
      return;
    }

    const updatedSeason = await this.seasonsRepository.update(id, payload);

    response.json(updatedSeason);
  };

  delete = async (request: Request, response: Response) => {
    const { id } = request.params;

    await this.seasonsRepository.delete(id);

    response.sendStatus(204);
  };

  closeSeason = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { authorization } = request.headers;

    const season = await this.seasonsRepository.findById(id);

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

    const updatedSeason = await this.seasonsRepository.update(id, season);

    response.json(updatedSeason);
  };
}

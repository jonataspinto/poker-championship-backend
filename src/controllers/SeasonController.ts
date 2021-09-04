import { Request, Response } from "express";
import { ISeason } from "../interfaces/Season";
import { IIdProvider } from "../interfaces/IdProvider";
import { IDatabase } from "../interfaces/Database";
import { Season } from "../domain/Season";
import { BaseController } from "./BaseController";
import { IAuth } from "../interfaces/Auth";

export class SeasonController implements BaseController<ISeason> {
  private SeasonDomain: Season<IIdProvider>

  constructor(
    idProvider: IIdProvider,
    private dbAdapter: IDatabase<ISeason>,
    private auth: IAuth,
  ) {
    this.SeasonDomain = new Season(idProvider);
  }

  async save(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const list = await this.dbAdapter.getAll();
    const season = this.SeasonDomain.create({
      ...data,
      tag: Array.from(list as ISeason[]).length + 1,
    });
    const newSeason = await this.dbAdapter.save(season);
    return response.status(200).json(newSeason);
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    const list = await this.dbAdapter.getAll();
    const orderedList = Array.from(list as ISeason[]).sort((a, b) => (b.tag - a.tag));
    return response.status(200).json(orderedList);
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
        return response.status(400).json({ message: "temporada fechada!" });
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

  async closeSeason(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { authorization } = request.headers;

      const season = await this.dbAdapter.getById(id);

      // TODO aqui deve disparar a criação de uma nova copa adicionando os 10 primeiros colocados.

      if (season.hasClosed) {
        return response.status(400).json({ message: "jornada fechada!" });
      }

      if (authorization) {
        const userId = await this.auth.getUuidByToken(authorization.split(" ")[1]);
        season.hasClosed = true;
        season.closedBy = userId;
      }

      const updatedData = await this.dbAdapter.update(id, season);

      return response.json(updatedData);
    } catch ({ message }) {
      return response.status(400).send({ message });
    }
  }
}

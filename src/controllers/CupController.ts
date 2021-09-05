import { Request, Response } from "express";
import { ICup } from "../interfaces/Cup";
import { IIdProvider } from "../interfaces/IdProvider";
import { IDatabase } from "../interfaces/Database";
import { Cup } from "../domain/Cup";
import { BaseController } from "./BaseController";
import { IAuth } from "../interfaces/Auth";

export class CupController implements BaseController<ICup> {
  private cupDomain: Cup<IIdProvider>

  constructor(
    idProvider: IIdProvider,
    private dbAdapter: IDatabase<ICup>,
    private auth: IAuth,
  ) {
    this.cupDomain = new Cup(idProvider);
  }

  async save(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const cup = this.cupDomain.create({
      ...data,
    });
    const newCup = await this.dbAdapter.save(cup);
    return response.status(200).json(newCup);
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    const list = await this.dbAdapter.getAll();
    const orderedList = Array.from(list as ICup[]).sort((a, b) => (b.tag - a.tag));
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
        return response.status(400).json({ message: "copa fechada!" });
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

  async closeCup(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { authorization } = request.headers;

      const cup = await this.dbAdapter.getById(id);

      // Todo distribuir pontuaçãoes

      if (cup.hasClosed) {
        return response.status(400).json({ message: "copa fechada!" });
      }
      if (authorization) {
        const userId = await this.auth.getUuidByToken(authorization.split(" ")[1]);
        cup.hasClosed = true;
        cup.closedBy = userId;
      }

      const updatedData = await this.dbAdapter.update(id, cup);

      return response.json(updatedData);
    } catch ({ message }) {
      return response.status(400).send({ message });
    }
  }
}

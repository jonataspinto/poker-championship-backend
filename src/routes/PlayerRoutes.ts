import { Router } from "express";
import { PlayerController } from "../controllers";
import { IsAuthenticated } from "../middlewares";
import { PlayersRepository } from "../repositories";
import { FirestoreAdapterDB } from "../database";

class PlayerRoutes {
  private router: Router;

  private path = "players";

  private playerController: PlayerController;

  constructor() {
    const playersRepository = new PlayersRepository(
      new FirestoreAdapterDB("users")
    );

    this.router = Router();
    this.playerController = new PlayerController(playersRepository);
  }

  index() {
    this.router.post(`/${this.path}`, this.playerController.store);
    this.router.get(`/${this.path}`, this.playerController.index);
    this.router.get(`/${this.path}/:id`, this.playerController.show);
    this.router.put(
      `/${this.path}/:id`,
      IsAuthenticated,
      this.playerController.update
    );
    this.router.delete(
      `/${this.path}/:id`,
      IsAuthenticated,
      this.playerController.delete
    );

    return this.router;
  }
}

export default new PlayerRoutes().index();

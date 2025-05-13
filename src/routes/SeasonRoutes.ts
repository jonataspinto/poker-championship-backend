import { Router } from "express";
import { SeasonController } from "../controllers";
import { IsAuthenticated } from "../middlewares";
import { SeasonsRepository } from "../repositories";
import { FirestoreAdapterDB } from "../database";
import { FirebaseAuthAdapter } from "../adapters";

class SeasonRoutes {
  private router: Router;

  private path = "/seasons";

  private seasonController: SeasonController;

  constructor() {
    const auth = new FirebaseAuthAdapter();
    const seasonsRepository = new SeasonsRepository(
      new FirestoreAdapterDB("seasons")
    );

    this.router = Router();
    this.seasonController = new SeasonController(auth, seasonsRepository);
  }

  index() {
    this.router.get(`${this.path}`, this.seasonController.index);
    this.router.get(`${this.path}/:id`, this.seasonController.show);
    this.router.post(
      `${this.path}`,
      IsAuthenticated,
      this.seasonController.store
    );
    this.router.put(
      `${this.path}/:id`,
      IsAuthenticated,
      this.seasonController.update
    );
    this.router.delete(
      `${this.path}/:id`,
      IsAuthenticated,
      this.seasonController.delete
    );
    this.router.put(
      `${this.path}/:id/close`,
      IsAuthenticated,
      this.seasonController.closeSeason
    );

    return this.router;
  }
}

export default new SeasonRoutes().index();

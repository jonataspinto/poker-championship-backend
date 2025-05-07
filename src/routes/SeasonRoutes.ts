import { Router } from "express";
import { SeasonController } from "../controllers";
import { IsAuthenticated } from "../middlewares";

class SeasonRoutes {
  private router: Router;

  private path = "/seasons";

  private seasonController: SeasonController;

  constructor() {
    this.router = Router();
    this.seasonController = new SeasonController();
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

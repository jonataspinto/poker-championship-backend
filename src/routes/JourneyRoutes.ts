import { Router } from "express";
import { JourneyController } from "../controllers";
import {
  IsAuthenticated,
  UpdateJourneyValidation,
  CreateJourneyValidation
} from "../middlewares";

class JourneyRoutes {
  private router: Router;

  private journeyController: JourneyController;

  private path = "journeys";

  constructor() {
    this.router = Router();
    this.journeyController = new JourneyController();
  }

  index() {
    this.router.get(`/${this.path}`, this.journeyController.index);
    this.router.get(`/${this.path}/:id`, this.journeyController.show);
    this.router.delete(
      `/${this.path}/:id`,
      IsAuthenticated,
      this.journeyController.delete
    );
    this.router.post(
      `/${this.path}`,
      IsAuthenticated,
      CreateJourneyValidation,
      this.journeyController.store
    );
    this.router.put(
      `/${this.path}/:id`,
      IsAuthenticated,
      UpdateJourneyValidation,
      this.journeyController.update
    );
    this.router.put(
      `/${this.path}/:id/close`,
      IsAuthenticated,
      UpdateJourneyValidation,
      this.journeyController.closeJourney
    );

    return this.router;
  }
}

export default new JourneyRoutes().index();

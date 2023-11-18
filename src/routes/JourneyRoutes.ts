import { Router } from "express";
import { UpdateJourneyValidation, CreateJourneyValidation } from "../middlewares/JourneyValidation";
import { IsAuthenticated } from "../middlewares/Auth";
import JourneyController from "../controllers/JourneyController";

class JourneyRoutes {
  private router: Router

  private path = "journeys"

  constructor() {
    this.router = Router();
  }

  index() {
    this.router.get(`/${this.path}`, JourneyController.index);
    this.router.get(`/${this.path}/:id`, JourneyController.show);
    this.router.delete(`/${this.path}/:id`, IsAuthenticated, JourneyController.delete);
    this.router.post(
      `/${this.path}`,
      IsAuthenticated,
      CreateJourneyValidation,
      JourneyController.store,
    );
    this.router.put(
      `/${this.path}/:id`,
      IsAuthenticated,
      UpdateJourneyValidation,
      JourneyController.update,
    );
    this.router.put(
      `/${this.path}/:id/close`,
      IsAuthenticated,
      UpdateJourneyValidation,
      JourneyController.closeJourney,
    );

    return this.router;
  }
}

export default new JourneyRoutes().index();

import { Router } from "express";
import { JourneyController } from "../controllers";
import {
  IsAuthenticated,
  UpdateJourneyValidation,
  CreateJourneyValidation
} from "../middlewares";
import { FirebaseAuthAdapter } from "../adapters";
import { FirestoreAdapterDB } from "../database";
import {
  JourneysRepository,
  JourneyTagsRepository,
  PlayersRepository
} from "../repositories";

class JourneyRoutes {
  private router: Router;

  private journeyController: JourneyController;

  private path = "journeys";

  constructor() {
    this.router = Router();

    const auth = new FirebaseAuthAdapter();

    const journeysRepository = new JourneysRepository(
      new FirestoreAdapterDB("journeys")
    );

    const journeyTagsRepository = new JourneyTagsRepository(
      new FirestoreAdapterDB("journey-tags")
    );

    const playersRepository = new PlayersRepository(
      new FirestoreAdapterDB("users")
    );

    this.journeyController = new JourneyController(
      auth,
      journeysRepository,
      journeyTagsRepository,
      playersRepository
    );
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

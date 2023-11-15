import { Request, Response, Router } from "express";
import { IdProviderAdapter } from "../adapters/IdProviderAdapter";
import { FirestoreAdapter } from "../adapters/FirebaseAdapter";
import { FirebaseAuthAdapter } from "../adapters/FirebaseAuthAdapter";
import { JourneyController } from "../controllers/JourneyController";
import { IsAuthenticated } from "../middlewares/Auth";
import { UpdateJourneyValidation, CreateJourneyValidation } from "../middlewares/JourneyValidation";

class JourneyRoutes {
  private journeyController: JourneyController

  constructor(
    private journeyRouter = Router(),
  ) {
    this.journeyController = new JourneyController(
      new FirestoreAdapter<IJourney>("journeys"),
      new FirebaseAuthAdapter(),
      new IdProviderAdapter(),
    );
  }

  execute() {
    this.journeyRouter.get("/journeys", (request: Request, response: Response) => {
      this.journeyController.getAll(request, response);
    });

    this.journeyRouter.get("/journeys/:id", (request: Request, response: Response) => {
      this.journeyController.getById(request, response);
    });

    this.journeyRouter.post(
      "/journeys",
      IsAuthenticated,
      CreateJourneyValidation,
      (request: Request, response: Response) => {
        this.journeyController.save(request, response);
      },
    );

    this.journeyRouter.put(
      "/journeys/:id",
      IsAuthenticated,
      UpdateJourneyValidation,
      (request: Request, response: Response) => {
        this.journeyController.update(request, response);
      },
    );

    this.journeyRouter.delete("/journeys/:id", IsAuthenticated, (request: Request, response: Response) => {
      this.journeyController.delete(request, response);
    });

    this.journeyRouter.put(
      "/journeys/close/:id",
      IsAuthenticated,
      UpdateJourneyValidation,
      (request: Request, response: Response) => {
        this.journeyController.closeJourney(request, response);
      },
    );

    return this.journeyRouter;
  }
}

export const journeyRouter = new JourneyRoutes().execute();

import { Request, Response, Router } from "express";
import { FirestoreAdapter } from "../adapters/FirebaseAdapter";
import { FirebaseAuthAdapter } from "../adapters/FirebaseAuthAdapter";
import { IdProviderAdapter } from "../adapters/IdProviderAdapter";
import { JourneyController } from "../controllers/JourneyController";
import { IJourney } from "../interfaces/Journey";
import { IsAuthenticated } from "../middlewares/Auth";
import { UpdateValidation, CreateValidation } from "../middlewares/JourneyValidation";

class JourneyRoutes {
  private journeyController: JourneyController

  constructor(
    private journeyRouter = Router(),
    dbAdapter = new FirestoreAdapter<IJourney>("journeys"),
    idProvider = new IdProviderAdapter(),
  ) {
    this.journeyController = new JourneyController(
      idProvider,
      dbAdapter,
      new FirebaseAuthAdapter(),
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
      CreateValidation,
      (request: Request, response: Response) => {
        this.journeyController.save(request, response);
      },
    );

    this.journeyRouter.put(
      "/journeys/:id",
      IsAuthenticated,
      UpdateValidation,
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
      UpdateValidation,
      (request: Request, response: Response) => {
        this.journeyController.closeJourney(request, response);
      },
    );

    return this.journeyRouter;
  }
}

export const journeyRouter = new JourneyRoutes().execute();

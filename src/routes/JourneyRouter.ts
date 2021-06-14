import { Request, Response, Router } from "express";
// import { FirestoreAdapter, IdProviderAdapter } from "@Adapters";
// import { JourneyController } from "@Controllers";
// import { IJourney } from "@Interfaces";
import { FirestoreAdapter } from "../adapters/FirebaseAdapter";
import { IdProviderAdapter } from "../adapters/IdProviderAdapter";
import { JourneyController } from "../controllers/JourneyController";
import { IJourney } from "../interfaces/Journey";

class JourneyRoutes {
  private journeyController: JourneyController

  constructor(
    dbAdapter = new FirestoreAdapter<IJourney>("journeys"),
    idProvider = new IdProviderAdapter(),
    private journeyRouter = Router(),
  ) {
    this.journeyController = new JourneyController(dbAdapter, idProvider);
  }

  execute() {
    this.journeyRouter.post("/journeys", (request: Request, response: Response) => {
      this.journeyController.save(request, response);
    });

    this.journeyRouter.get("/journeys", (request: Request, response: Response) => {
      this.journeyController.getAll(request, response);
    });

    this.journeyRouter.get("/journeys/:id", (request: Request, response: Response) => {
      this.journeyController.getById(request, response);
    });

    this.journeyRouter.put("/journeys/:id", (request: Request, response: Response) => {
      this.journeyController.update(request, response);
    });

    this.journeyRouter.delete("/journeys/:id", (request: Request, response: Response) => {
      this.journeyController.delete(request, response);
    });

    return this.journeyRouter;
  }
}

export const journeyRouter = new JourneyRoutes().execute();

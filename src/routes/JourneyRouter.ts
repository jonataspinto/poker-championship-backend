import { Request, Response, Router } from "express";
import { FirestoreAdapter } from "../adapters/FirebaseAdapter";
import { IdProviderAdapter } from "../adapters/IdProviderAdapter";
import { JourneyController } from "../controllers/JourneyController";
import { IJourney } from "../interfaces/Journey";
import { IsAuthenticated } from "../middlewares/Auth";

class JourneyRoutes {
  private journeyController: JourneyController

  constructor(
    private journeyRouter = Router(),
    dbAdapter = new FirestoreAdapter<IJourney>("journeys"),
    idProvider = new IdProviderAdapter(),
  ) {
    this.journeyController = new JourneyController(dbAdapter, idProvider);
  }

  execute() {
    this.journeyRouter.get("/journeys", (request: Request, response: Response) => {
      this.journeyController.getAll(request, response);
    });

    this.journeyRouter.get("/journeys/:id", (request: Request, response: Response) => {
      this.journeyController.getById(request, response);
    });

    this.journeyRouter.post("/journeys", IsAuthenticated, (request: Request, response: Response) => {
      this.journeyController.save(request, response);
    });

    this.journeyRouter.put("/journeys/:id", IsAuthenticated, (request: Request, response: Response) => {
      this.journeyController.update(request, response);
    });

    this.journeyRouter.delete("/journeys/:id", IsAuthenticated, (request: Request, response: Response) => {
      this.journeyController.delete(request, response);
    });

    return this.journeyRouter;
  }
}

export const journeyRouter = new JourneyRoutes().execute();

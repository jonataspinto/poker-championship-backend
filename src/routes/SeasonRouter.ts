import { Request, Response, Router } from "express";
import { FirestoreAdapter } from "../adapters/FirebaseAdapter";
import { FirebaseAuthAdapter } from "../adapters/FirebaseAuthAdapter";
import { IdProviderAdapter } from "../adapters/IdProviderAdapter";
import { SeasonController } from "../controllers/SeasonController";
import { IsAuthenticated } from "../middlewares/Auth";
import { UpdateSeasonValidation } from "../middlewares/SeasonValidation";

class SeasonRoutes {
  private seasonController: SeasonController

  constructor(
    private seasonRouter = Router(),
    dbAdapter = new FirestoreAdapter<ISeason>("seasons"),
    idProvider = new IdProviderAdapter(),
  ) {
    this.seasonController = new SeasonController(
      idProvider,
      dbAdapter,
      new FirebaseAuthAdapter(),
    );
  }

  execute() {
    this.seasonRouter.get("/seasons", (request: Request, response: Response) => {
      this.seasonController.getAll(request, response);
    });

    this.seasonRouter.get("/seasons/:id", (request: Request, response: Response) => {
      this.seasonController.getById(request, response);
    });

    this.seasonRouter.post("/seasons", IsAuthenticated, (request: Request, response: Response) => {
      this.seasonController.save(request, response);
    });

    this.seasonRouter.put(
      "/seasons/:id",
      IsAuthenticated,
      UpdateSeasonValidation,
      (request: Request, response: Response) => {
        this.seasonController.update(request, response);
      },
    );

    this.seasonRouter.delete("/seasons/:id", IsAuthenticated, (request: Request, response: Response) => {
      this.seasonController.delete(request, response);
    });

    this.seasonRouter.put(
      "/seasons/close/:id",
      IsAuthenticated,
      UpdateSeasonValidation,
      (request: Request, response: Response) => {
        this.seasonController.closeSeason(request, response);
      },
    );

    return this.seasonRouter;
  }
}

export const seasonRouter = new SeasonRoutes().execute();

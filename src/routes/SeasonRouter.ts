import { Request, Response, Router } from "express";
import { FirestoreAdapter } from "../adapters/FirebaseAdapter";
import { FirebaseAuthAdapter } from "../adapters/FirebaseAuthAdapter";
import { IdProviderAdapter } from "../adapters/IdProviderAdapter";
import { SeasonController } from "../controllers/SeasonController";
import { ISeason } from "../interfaces/Season";
import { IsAuthenticated } from "../middlewares/Auth";
import { SeasonUpdateValidation } from "../middlewares/UpdateSeasonValidation";

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
      "/season/:id",
      IsAuthenticated,
      SeasonUpdateValidation,
      (request: Request, response: Response) => {
        this.seasonController.update(request, response);
      },
    );

    this.seasonRouter.delete("/season/:id", IsAuthenticated, (request: Request, response: Response) => {
      this.seasonController.delete(request, response);
    });

    this.seasonRouter.put(
      "/season/close/:id",
      IsAuthenticated,
      SeasonUpdateValidation,
      (request: Request, response: Response) => {
        this.seasonController.closeSeason(request, response);
      },
    );

    return this.seasonRouter;
  }
}

export const seasonRouter = new SeasonRoutes().execute();

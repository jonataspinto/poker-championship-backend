import { Request, Response, Router } from "express";
import { FirestoreAdapter } from "../adapters/FirebaseAdapter";
import { FirebaseAuthAdapter } from "../adapters/FirebaseAuthAdapter";
import { IdProviderAdapter } from "../adapters/IdProviderAdapter";
import { CupController } from "../controllers/CupController";
import { IsAuthenticated } from "../middlewares/Auth";
import {
  UpdateCupValidation,
  CreateCupValidation,
} from "../middlewares/CupValidation";

class CupRoutes {
  private cupController: CupController;

  constructor(
    private cupRouter = Router(),
    dbAdapter = new FirestoreAdapter<ICup>("journeys"),
    idProvider = new IdProviderAdapter(),
  ) {
    this.cupController = new CupController(
      idProvider,
      dbAdapter,
      new FirebaseAuthAdapter(),
    );
  }

  execute() {
    this.cupRouter.get("/cups", (request: Request, response: Response) => {
      this.cupController.getAll(request, response);
    });

    this.cupRouter.get("/cups/:id", (request: Request, response: Response) => {
      this.cupController.getById(request, response);
    });

    this.cupRouter.post(
      "/cups",
      IsAuthenticated,
      CreateCupValidation,
      (request: Request, response: Response) => {
        this.cupController.save(request, response);
      },
    );

    this.cupRouter.put(
      "/cups/:id",
      IsAuthenticated,
      UpdateCupValidation,
      (request: Request, response: Response) => {
        this.cupController.update(request, response);
      },
    );

    this.cupRouter.delete(
      "/cups/:id",
      IsAuthenticated,
      (request: Request, response: Response) => {
        this.cupController.delete(request, response);
      },
    );

    this.cupRouter.put(
      "/cups/close/:id",
      IsAuthenticated,
      UpdateCupValidation,
      (request: Request, response: Response) => {
        this.cupController.closeCup(request, response);
      },
    );

    return this.cupRouter;
  }
}

export const cupRouter = new CupRoutes().execute();

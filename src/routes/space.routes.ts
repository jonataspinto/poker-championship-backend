import { Router } from "express";
import { SpaceController } from "../controllers";

const spaceController = new SpaceController();

export const spaceRoutes = Router();

spaceRoutes.route("/api/space")
  .get(spaceController.fetch)
  .post(spaceController.save);

spaceRoutes.route("/api/space/:id")
  .get(spaceController.getById)
  .put(spaceController.update)
  .delete(spaceController.delete);

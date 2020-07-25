import { Router } from "express";
import { JourneyController } from "../controllers";

export const journeyRoutes = Router();

journeyRoutes.route("/api/new-journey")
  .post(JourneyController.post);

journeyRoutes.route("/api/journey")
  .get(JourneyController.get)
  .put(JourneyController.put);

journeyRoutes.route("/api/journey/:id")
  .get(JourneyController.get)
  .put(JourneyController.put);

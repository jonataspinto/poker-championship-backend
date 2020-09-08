import { Router } from "express";
import { JourneyController } from "../controllers";

export const journeyRoutes = Router();

journeyRoutes.route("/api/journey")
  .get(JourneyController.get)
  .put(JourneyController.put)
  .post(JourneyController.post);

journeyRoutes.route("/api/journey/:_id")
  .get(JourneyController.get)
  .put(JourneyController.put);

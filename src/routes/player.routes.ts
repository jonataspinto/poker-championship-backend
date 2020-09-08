import { Router } from "express";
import { PlayerController } from "../controllers";
import { playerExists } from "../middlewares";

export const playerRoutes = Router();

playerRoutes.route("/api/player")
  .get(PlayerController.get)
  .post(playerExists, PlayerController.post)
  .put(PlayerController.put)
  .delete(PlayerController.delete);

playerRoutes.route("/api/player/:id")
  .get(PlayerController.get)
  .put(PlayerController.put);

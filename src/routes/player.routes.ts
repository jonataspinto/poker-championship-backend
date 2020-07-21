import { Router } from "express";
import { PlayerController } from "../controllers";
import { playerExists } from "../middlewares";

export const playerRoutes = Router();

playerRoutes.route("/api/players")
  .get(PlayerController.get)
  .post(playerExists, PlayerController.post)
  .put(PlayerController.put)
  .delete(PlayerController.delete);

playerRoutes.route("/api/players/:id")
  .get(PlayerController.get)
  .put(PlayerController.put);

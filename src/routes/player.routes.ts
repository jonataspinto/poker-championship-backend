import { Router } from "express";
import PlayerController from "../controllers/playerController";

export const playerRoutes = Router();

playerRoutes.route("/api/players")
  .get(PlayerController.get)
  .post(PlayerController.post)
  .put(PlayerController.put);

playerRoutes.route("/api/players/:id")
  .get(PlayerController.get)
  .put(PlayerController.put)
  .delete(PlayerController.delete);

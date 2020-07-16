import { Router } from "express";
import { SerieController } from "../controllers";

export const serieRoutes = Router();

serieRoutes.route("/api")
  .get(SerieController.get);

serieRoutes.route("/api/serie/:serie")
  .get(SerieController.get);

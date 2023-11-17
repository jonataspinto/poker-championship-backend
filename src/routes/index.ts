import { Express } from "express";
import PlayerRoutes from "./PlayerRoutes";
import SeasonRoutes from "./SeasonRoutes";

export class Routes {
  static use(app: Express) {
    app.use(PlayerRoutes);
    app.use(SeasonRoutes);
  }
}

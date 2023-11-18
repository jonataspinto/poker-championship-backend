import { Express } from "express";
import PlayerRoutes from "./PlayerRoutes";
import SeasonRoutes from "./SeasonRoutes";
import JourneyRoutes from "./JourneyRoutes";

export class Routes {
  static use(app: Express) {
    app.use(PlayerRoutes);
    app.use(SeasonRoutes);
    app.use(JourneyRoutes);
  }
}

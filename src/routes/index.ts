import { Express } from "express";
import PlayerRoutes from "./PlayerRoutes";

export class Routes {
  static use(app: Express) {
    app.use(PlayerRoutes);
  }
}

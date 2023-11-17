import { Router } from "express";
import SeasonController from "../controllers/SeasonController";
import { IsAuthenticated } from "../middlewares/Auth";

class SeasonRoutes {
  private router: Router

  private path = "/seasons"

  constructor() {
    this.router = Router();
  }

  index() {
    this.router.get(`${this.path}`, SeasonController.index);
    this.router.get(`${this.path}/:id`, SeasonController.show);
    this.router.post(`${this.path}`, IsAuthenticated, SeasonController.store);
    this.router.put(`${this.path}/:id`, IsAuthenticated, SeasonController.update);
    this.router.delete(`${this.path}/:id`, IsAuthenticated, SeasonController.delete);
    this.router.put(`${this.path}/:id/close`, IsAuthenticated, SeasonController.closeSeason);

    return this.router;
  }
}

export default new SeasonRoutes().index();

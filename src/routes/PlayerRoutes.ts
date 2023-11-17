import { Router } from "express";
import PlayerController from "../controllers/PlayerController";
import { IsAuthenticated } from "@/middlewares/Auth";

class PlayerRoutes {
  private router: Router

  private path = "players"

  constructor() {
    this.router = Router();
  }

  index() {
    this.router.post(`/${this.path}`, PlayerController.store);
    this.router.get(`/${this.path}`, PlayerController.index);
    this.router.get(`/${this.path}/:id`, PlayerController.show);
    this.router.put(`/${this.path}/:id`, IsAuthenticated, PlayerController.update);
    this.router.delete(`/${this.path}/:id`, IsAuthenticated, PlayerController.delete);

    return this.router;
  }
}

export default new PlayerRoutes().index();

import { Router } from "express";
import PlayerController from "@/controllers/PlayerController";

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
    this.router.put(`/${this.path}/:id`, PlayerController.update);
    this.router.delete(`/${this.path}/:id`, PlayerController.delete);

    return this.router;
  }
}

export default new PlayerRoutes().index();

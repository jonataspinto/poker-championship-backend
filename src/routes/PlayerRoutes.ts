import { Router } from "express";
import { PlayerController } from "../controllers";
import { IsAuthenticated } from "../middlewares/Auth";

class PlayerRoutes {
  private router: Router;

  private path = "players";

  private playerController: PlayerController;

  constructor() {
    this.router = Router();
    this.playerController = new PlayerController();
  }

  index() {
    this.router.post(`/${this.path}`, this.playerController.store);
    this.router.get(`/${this.path}`, this.playerController.index);
    this.router.get(`/${this.path}/:id`, this.playerController.show);
    this.router.put(
      `/${this.path}/:id`,
      IsAuthenticated,
      this.playerController.update
    );
    this.router.delete(
      `/${this.path}/:id`,
      IsAuthenticated,
      this.playerController.delete
    );

    return this.router;
  }
}

export default new PlayerRoutes().index();

import { Router } from "express";
import { UserController } from "../controllers";
import { playerExists } from "../middlewares";

const userController = new UserController();

export const userRoutes = Router();

userRoutes.route("/api/users")
  .get(userController.fetch)
  .post(userController.save);

userRoutes.route("/api/users/:id")
  .get(userController.getById)
  .put(userController.update);

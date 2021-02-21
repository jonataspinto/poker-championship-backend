import { Router } from "express";
import { playerRoutes } from "./player.routes";
import { spaceRoutes } from "./space.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes
  // .use(playerRoutes)
  .use(spaceRoutes)
  .use(userRoutes);

export default routes;

import express from "express";
import {
  playerRoutes,
  serieRoutes,
} from "./routes/index";
import config from "./config";

config();

const app = express();

app.use(express.json());
app.use(playerRoutes);
app.use(serieRoutes);

app.listen(4500, () => {
  console.log("server in runing in http://localhost:4500/api");
});

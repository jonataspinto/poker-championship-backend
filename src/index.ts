import express from "express";
import cors from "cors";
import {
  playerRoutes,
  serieRoutes,
} from "./routes/index";
import config from "./config";

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(playerRoutes);
app.use(serieRoutes);

app.listen(4500, () => {
  console.log("server in runing in http://localhost:4500/api");
});

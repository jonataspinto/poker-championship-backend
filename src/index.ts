import express from "express";
import cors from "cors";
import {
  playerRoutes,
  journeyRoutes,
} from "./routes/index";
import config from "./config";

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(playerRoutes);
app.use(journeyRoutes);

app.listen(process.env.PORT || 4500, () => {
  console.log("server is runing in http://localhost:4500/api");
});

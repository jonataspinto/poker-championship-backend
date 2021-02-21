import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Routes from "./routes";
import config from "./config";

config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Routes);

app.listen(process.env.PORT || 4500, () => {
  console.log("server is runing in http://localhost:4500/api");
});

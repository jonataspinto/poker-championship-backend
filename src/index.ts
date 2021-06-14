// import "module-alias/register";
import express from "express";
import { userRouter } from "./routes/UserRouter";
import { journeyRouter } from "./routes/JourneyRouter";
import { AppConfig } from "./config";

const app = express();

AppConfig(app);

app.use(userRouter);
app.use(journeyRouter);

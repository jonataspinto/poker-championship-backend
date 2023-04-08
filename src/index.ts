// import "module-alias/register";
import express from "express";
import { userRouter } from "./routes/UserRouter";
import { journeyRouter } from "./routes/JourneyRouter";
import { seasonRouter } from "./routes/SeasonRouter";
import { cupRouter } from "./routes/CupRouter";
import { AppConfig } from "./config";

const app = AppConfig(express());

app.use(userRouter);
app.use(journeyRouter);
app.use(seasonRouter);
app.use(cupRouter);

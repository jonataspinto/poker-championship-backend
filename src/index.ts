// import "module-alias/register";
import express from "express";
import { userRouter } from "./routes/UserRouter";
import { journeyRouter } from "./routes/JourneyRouter";
import { AppConfig } from "./config";

const app = AppConfig(express());

app.use(userRouter);
app.use(journeyRouter);

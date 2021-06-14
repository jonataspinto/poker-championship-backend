import "module-alias/register";
import express from "express";
import { journeyRouter, userRouter } from "@Routes";
import { AppConfig } from "./config";

const app = express();

AppConfig(app);

app.use(userRouter);
app.use(journeyRouter);

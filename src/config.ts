import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import { Routes } from "./routes";
import { ErrorHandler } from "./middlewares/ErrorHandler";

export const AppConfig = (app: Express) => {
  dotenv.config();

  app.use(express.json());

  app.use(cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
  }));

  Routes.use(app);

  app.use(ErrorHandler);

  return app;
};

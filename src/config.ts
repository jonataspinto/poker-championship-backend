import dotenv from "dotenv";
import express, { Express, Response } from "express";
import cors from "cors";

export const AppConfig = (app: Express) => {
  app.use(cors({ origin: true }));

  app.use(express.json());

  app.get("/", (_, response: Response) => {
    response.status(200).json({
      message: "Welcome!",
    });
  });

  app.listen(3333, () => {
    console.log("serever is run in http://localhost:3333");
  });

  return dotenv.config();
};

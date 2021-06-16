import dotenv from "dotenv";
import express, { Express, Response } from "express";
import cors from "cors";

export const AppConfig = (app: Express) => {
  dotenv.config();

  app.use(cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
  }));

  app.use(express.json());

  app.get("/", (_, response: Response) => {
    response.status(200).json({
      message: "Welcome!",
    });
  });

  app.listen(process.env.PORT || 3333, () => {
    console.log("serever is run 👽");
  });

  return app;
};

import express from "express";
import { AppConfig } from "./config";

const app = AppConfig(express());

app.listen(3333, () => {
  console.log(`serever is run 👽 in http://localhost:${3333}`);
});

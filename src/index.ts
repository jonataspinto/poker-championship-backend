import express from "express";
import { AppConfig } from "./config";

const app = AppConfig(express());

app.listen(process.env.PORT || 3333, () => {
  console.log(
    `serever is run 👽 in http://localhost:${process.env.PORT || 3333}`
  );
});

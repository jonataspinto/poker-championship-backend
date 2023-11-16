import express from "express";
import { AppConfig } from "./config";
import { Routes } from "./routes";

const app = AppConfig(express());

Routes.use(app);

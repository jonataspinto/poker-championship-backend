import { Request, Response, NextFunction } from "express";
import { PlayerSchema } from "../models";

export const playerExists = async (request: Request, response: Response, next: NextFunction) => {
  const {
    email,
    uid,
  } = request.body;

  const playerForUid = await PlayerSchema.findOne({ uid });

  if (playerForUid) {
    return response.json(playerForUid);
  }

  const playerForEmail = await PlayerSchema.findOne({ email });

  if (playerForEmail) {
    return response.json(playerForEmail);
  }

  return next();
};

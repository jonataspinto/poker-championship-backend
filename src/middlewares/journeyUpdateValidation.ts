import { Request, Response, NextFunction } from "express";

export const journeyUpdateValidation = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const {
    hasClosed,
  } = request.body;

  console.log("middle", request.body);

  if (hasClosed) {
    return response.send(" jornada fechada!");
  }

  return next();
};

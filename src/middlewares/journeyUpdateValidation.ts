import { Request, Response, NextFunction } from "express";

export const JourneyUpdateValidation = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const {
    hasClosed,
  } = request.body;

  const { id } = request.params;

  if (hasClosed) {
    return response.status(400).json({ message: "jornada fechada!" });
  }

  if (!id) {
    return response.status(400).json({ message: "id é obrigatório! 😉" });
  }

  return next();
};

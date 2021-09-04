import { Request, Response, NextFunction } from "express";

export const SeasonUpdateValidation = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const {
    hasClosed,
  } = request.body;

  const { id } = request.params;

  if (hasClosed) {
    return response.status(400).json({ message: "temporada fechada!" });
  }

  if (!id) {
    return response.status(400).json({ message: "id é obrigatório! 😉" });
  }

  return next();
};

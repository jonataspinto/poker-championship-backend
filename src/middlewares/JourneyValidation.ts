import { Request, Response, NextFunction } from "express";

export const CreateJourneyValidation = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const {
    seasonId,
    players,
  } = request.body;

  if (!seasonId) {
    return response.status(400).json({ message: "id da temporada deve ser fornecido!" });
  }

  if (!players) {
    return response.status(400).json({ message: "lista de jogadores deve ser fornecido!" });
  }
  return next();
};

export const UpdateJourneyValidation = async (
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

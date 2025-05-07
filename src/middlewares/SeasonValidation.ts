import { Request, Response, NextFunction } from "express";

export const UpdateSeasonValidation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { hasClosed } = request.body;

  const { id } = request.params;

  if (hasClosed) {
    response.status(400).json({ message: "temporada fechada!" });
    return;
  }

  if (!id) {
    response.status(400).json({ message: "id é obrigatório! 😉" });
    return;
  }

  next();
};

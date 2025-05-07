import { Request, Response, NextFunction } from "express";

export const CreateCupValidation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { seasonId, tag, players } = request.body;

  if (!seasonId) {
    response
      .status(400)
      .json({ message: "id da temporada deve ser fornecido!" });
    return;
  }

  if (!tag) {
    response
      .status(400)
      .json({ message: "tag da temporada deve ser fornecido!" });

    return;
  }

  if (!players) {
    response
      .status(400)
      .json({ message: "lista de jogadores deve ser fornecido!" });
    return;
  }

  next();
};

export const UpdateCupValidation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { hasClosed } = request.body;

  const { id } = request.params;

  if (hasClosed) {
    response.status(400).json({ message: "copa fechada!" });
    return;
  }

  if (!id) {
    response.status(400).json({ message: "id é obrigatório! 😉" });
    return;
  }

  next();
};

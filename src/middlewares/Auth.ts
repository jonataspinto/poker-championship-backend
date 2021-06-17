import { Request, Response, NextFunction } from "express";
import { FirebaseAuthAdapter } from "../adapters/FirebaseAuthAdapter";

const Auth = new FirebaseAuthAdapter();

export const IsAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = request.headers;

    if (authorization) {
      await Auth.verifyToken(authorization.split(" ")[1]);

      return next();
    }

    return response.status(401).json({ message: "Vish! nada feito.. 🙁" });
  } catch ({ message }) {
    return response.status(400).send({ message });
  }
};

import { Request, Response, NextFunction } from "express";
import { FirebaseAuthAdapter } from "../adapters";

export const IsAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = request.headers;

    if (authorization) {
      const Auth = new FirebaseAuthAdapter();

      const isValid = await Auth.verifyToken(authorization.split(" ")[1]);

      if (isValid) {
        next();
        return;
      }
    }

    response.status(401).json({ message: "Vish! nada feito.. 🙁" });
  } catch (error) {
    response.status(400).json(error);
  }
};

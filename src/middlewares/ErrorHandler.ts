import {
  ErrorRequestHandler, NextFunction, Request, Response,
} from "express";

export const ErrorHandler = (
  error: ErrorRequestHandler,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log("Error: ", error);
  response.sendStatus(500);
};

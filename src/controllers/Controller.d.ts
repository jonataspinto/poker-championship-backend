import { Request, Response } from "express";

interface Controller {
  index: (request: Request, response: Response) => Promise<void>

  store: (request: Request, response: Response) => Promise<void>

  show: (request: Request, response: Response) => Promise<void>

  update: (request: Request, response: Response) => Promise<void>

  delete: (request: Request, response: Response) => Promise<void>
}

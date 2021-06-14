import { Request, Response } from "express";

export interface BaseController<T> {
  save: (request: Request, response: Response) => Promise<Response<T>>

  getAll: (request: Request, response: Response) => Promise<Response<Array<T>>>

  getById: (request: Request, response: Response) => Promise<Response<T>>

  update: (request: Request, response: Response) => Promise<Response>

  delete: (request: Request, response: Response) => Promise<Response>
}

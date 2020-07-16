import { Response, Request } from "express";
import { Player, PlayerSchema } from "../models";
import { Serie } from "../models";
import { SerieService } from "../services";

const serieService = new SerieService();

const serieController = {
  get: async (request: Request, response: Response) => {
    try {
      const { serie } = request.params;

      const players = await serieService.fetch(serie);

      return response.json(players);
    } catch (err) {
      return response.status(403).json({
        error: err.message,
      });
    }
  },
};

export default serieController;

import { Response, Request } from "express";
import { PlayerService } from "../services";

const playerService = new PlayerService();

const playerController = {
  get: async (request: Request, response: Response) => {
    try {
      const { id } = request.query;

      if (id) {
        const result = await playerService.get(id.toString());
        return response.json(result);
      }
      const result = await playerService.fetch();

      return response.json({ data: result });
    } catch (err) {
      return response.status(403).json({
        error: err.message,
      });
    }
  },

  post: (request: Request, response: Response) => {
    try {
      const { name, dateBirth } = request.body;

      const player = playerService.create({ name, dateBirth });

      return response.json({ message: "player created", Newplayer: player });
    } catch (err) {
      return response.status(403).json({
        error: err.message,
      });
    }
  },

  put: (request: Request, response: Response) => {
    try {
      const { id } = request.query;
      const { player } = request.body;

      playerService.update(player, id as string);

      return response.json({
        message: "player updated",
        player,
      });
    } catch (error) {
      return response.status(403).json({
        error: error.message,
      });
    }
  },

  delete: async (request: Request, response: Response) => {
    try {
      const { id } = request.query;

      const result = await playerService.destroy(id as string);

      return response.json(result);
    } catch (err) {
      return response.status(403).json({
        error: err.message,
      });
    }
  },

};

export default playerController;

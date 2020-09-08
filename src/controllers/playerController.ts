import { Response, Request } from "express";
import { PlayerService } from "../services";

const playerService = new PlayerService();

const playerController = {
  get: async (request: Request, response: Response) => {
    try {
      const { _id } = request.query;

      if (_id) {
        const result = await playerService.get(_id.toString());
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
      const {
        displayName,
        dateBirth,
        email,
        uid,
        photoURL,
      } = request.body;

      const player = playerService.create({
        displayName,
        dateBirth: dateBirth || "",
        email,
        uid: uid || "",
        photoURL: photoURL || "",
      });

      return response.status(201).json(player);
    } catch (err) {
      return response.status(403).json({
        error: err.message,
      });
    }
  },

  put: async (request: Request, response: Response) => {
    try {
      const { _id } = request.query;
      const { player } = request.body;

      const result = await playerService.update(player, _id as string);

      return response.status(204).json({
        result,
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
      const { _id } = request.query;

      const result = await playerService.destroy(_id as string);

      return response.status(200).json(result);
    } catch (err) {
      return response.status(403).json({
        error: err.message,
      });
    }
  },
};

export default playerController;

import { Response, Request } from "express";
import { JourneyService } from "../services";

const journeyService = new JourneyService();

const journeyController = {

  post: async (request: Request, response: Response) => {
    try {
      const journey = await journeyService.create();

      return response.json(journey);
    } catch (err) {
      return response.status(403).json({
        error: err.message,
      });
    }
  },

  get: async (request: Request, response: Response) => {
    try {
      const { _id } = request.query;

      if (_id) {
        const result = await journeyService.get(_id.toString());
        return response.json(result);
      }
      const result = await journeyService.fetch();

      return response.json({ data: result });
    } catch (err) {
      return response.status(403).json({
        error: err.message,
      });
    }
  },

  put: async (request: Request, response: Response) => {
    try {
      const { _id } = request.query;
      const { journey } = request.body;

      const result = await journeyService.update(journey, _id as string);

      return response.json({
        result,
        message: "journey updated",
        journey,
      });
    } catch (error) {
      return response.status(403).json({
        error: error.message,
      });
    }
  },

};

export default journeyController;

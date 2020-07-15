import { Response, Request } from "express";
import { IPlayer, SPlayer } from "../models";
import CreatePlayerService from "../services/CreatePlayerService";

const players: IPlayer[] = [
  {
    id: "6a421936-1d17-4078-96a2-0e46dee90875",
    name: "jonatas pinto",
    photoUrl: "",
    points: 0,
    podiums: {
      first: 0,
      second: 0,
      third: 0,
    },
  },
  {
    id: "278cc93b-dat8-483a-a290-e34b2784a100",
    name: "taywan pereira",
    photoUrl: "",
    points: 0,
    podiums: {
      first: 0,
      second: 0,
      third: 0,
    },
  },
];

function FindPlayer(id: string) {
  const player = players.find((_player) => _player.id === id);
  return { type: "player", ...player };
}

function UpdatePlayer(request: Request, response: Response) {
  const { id } = request.query;
  const { name } = request.body;

  const playerPosition = players.findIndex((player) => player.id === id);

  players[playerPosition] = {
    ...players[playerPosition],
    name,
  };

  response.json(players[playerPosition]);
}

function DeletePlayer(request: Request, response: Response) {
  const { id } = request.params;

  const playerPosition = players.findIndex((player) => player.id === id);

  if (playerPosition < 0) {
    return response.status(400).json({ error: "player not found" });
  }

  return players.splice(playerPosition, 1);
}

const playerController = {
  get: async (request: Request, response: Response) => {
    const { id } = request.query;

    if (id) {
      return response.json(FindPlayer(id as string));
    }
    const playersMon = await SPlayer.find({});

    return response.json({ players, mongo: playersMon });
  },

  post: (request: Request, response: Response) => {
    try {
      const { name } = request.body;

      const createPlayerService = new CreatePlayerService();

      const player = createPlayerService.run({ name });

      const splay = createPlayerService.create(name);

      players.push(player);

      return response.json({ message: "player created", splay });
    } catch (err) {
      return response.status(403).json({
        error: err.message,
      });
    }
  },

  put: (request: Request, response: Response) => {
    UpdatePlayer(request, response);

    return response.json({
      message: "player updated",
    });
  },

  delete: (request: Request, response: Response) => {
    DeletePlayer(request, response);

    return response.status(204).send();
  },

};

export default playerController;

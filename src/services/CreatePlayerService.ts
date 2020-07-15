import { IPlayer, Player, SPlayer } from "../models";

interface Request {
  name: string;
}

class CreatePlayerService {
  public run({ name }: Request) : IPlayer {
    if (!name) {
      throw new Error("name in required.");
    }

    const player = new Player(name);

    return player;
  }

  public async create(name: string) {
    await SPlayer.create({
      name,
      photoUrl: "",
      points: 0,
      podiums: {
        first: 0,
        second: 0,
        third: 0,
      },
    });
  }
}

export default CreatePlayerService;

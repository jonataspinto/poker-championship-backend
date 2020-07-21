/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { MongooseUpdateQuery } from "mongoose";
import { IPlayer, Player, PlayerSchema } from "../models";

interface Request {
  displayName: string;
  email: string;
  dateBirth: string;
  uid?: string;
  photoURL: string;
}

class PlayerService {
  player: Player = {
    uid: "",
    displayName: "",
    email: "",
    dateBirth: "",
    photoURL: "",
    points: 0,
    podiums: {
      first: 0,
      second: 0,
      third: 0,
    },
  };

  constructor() {
    this.player.photoURL = "";
    this.player.points = 0;
    this.player.podiums = {
      first: 0,
      second: 0,
      third: 0,
    };
  }

  private async insertPlayer(_player: Player) {
    await PlayerSchema.create(_player);
  }

  private async getPlayer(id: string) {
    const result = await PlayerSchema.findOne({ _id: id });

    return result;
  }

  private async fetchPlayers() {
    const result = await PlayerSchema.find({});

    return result;
  }

  private async updatePlayer({ player, _id } : MongooseUpdateQuery<Player>) {
    const result = await PlayerSchema.updateOne(player, _id);

    return result;
  }

  private async deletePlayer(id: string) {
    const result = await PlayerSchema.remove({ _id: id });

    const { deletedCount } = result;

    if (deletedCount === 0) {
      throw new Error("no player for this _id");
    }

    return result;
  }

  public create({
    displayName,
    dateBirth,
    email,
    uid,
    photoURL,
  }: Request) {
    if (!displayName || !dateBirth || !email) {
      throw new Error("displayName, email and dateBirth is required.");
    }
    this.player.displayName = displayName;
    this.player.email = email;
    this.player.dateBirth = dateBirth;
    this.player.uid = uid;
    this.player.photoURL = photoURL;

    const result = this.insertPlayer(this.player);

    return this.player;
  }

  get(id: string) {
    return this.getPlayer(id);
  }

  fetch() {
    return this.fetchPlayers();
  }

  update(player: Player, id: string) {
    if (!id) {
      throw new Error("id is required.");
    }
    return this.updatePlayer({ player, id });
  }

  destroy(id: string) {
    if (!id) {
      throw new Error("id is required.");
    }

    const result = this.deletePlayer(id);

    return result;
  }
}

export default PlayerService;

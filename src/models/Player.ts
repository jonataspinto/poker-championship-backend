import { uuid } from "uuidv4";
import mongoose from "mongoose";

interface IPodiums {
  first?: number;
  second?: number;
  third?: number;
}

export interface IPlayer {
  id: string;
  name: string;
  photoUrl: string;
  points: number;
  podiums?: IPodiums
}

export class Player {
  id: string;

  name: string;

  photoUrl: string;

  points: number;

  podiums?: IPodiums

  constructor(name: string) {
    this.id = uuid();
    this.name = name;
    this.photoUrl = "";
    this.points = 0;
    this.podiums = {
      first: 0,
      second: 0,
      third: 0,
    };
  }
}

const PlayerSchema = new mongoose.Schema({
  name: String,
  photoUrl: String,
  points: Number,
  podiums: {
    first: Number,
    second: Number,
    third: Number,
  },
});

export const SPlayer = mongoose.model("Player", PlayerSchema);

import mongoose from "mongoose";

interface IPodiums {
  first?: number;
  second?: number;
  third?: number;
}

export interface IPlayer {
  name: string;
  dateBirth: string,
  photoUrl: string;
  points: number;
  serie: string,
  podiums?: IPodiums;
}

const playerSchema = new mongoose.Schema({
  name: String,
  dateBirth: String,
  photoUrl: String,
  points: Number,
  serie: String,
  podiums: {
    first: Number,
    second: Number,
    third: Number,
  },
});

export const PlayerSchema = mongoose.model("Player", playerSchema);

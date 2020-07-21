import mongoose from "mongoose";

interface IPodiums {
  first?: number;
  second?: number;
  third?: number;
}

export interface IPlayer {
  displayName: string;
  email: string;
  dateBirth: string,
  photoURL: string;
  points: number;
  podiums?: IPodiums;
}

export interface Player extends IPlayer {
  uid: string | any;
}

const playerSchema = new mongoose.Schema({
  displayName: String,
  uid: String,
  email: String,
  dateBirth: String,
  photoURL: String,
  points: Number,
  podiums: {
    first: Number,
    second: Number,
    third: Number,
  },
});

export const PlayerSchema = mongoose.model("Player", playerSchema);

import mongoose from "mongoose";

interface IPodium {
  first?: string;
  second?: string;
  third?: string;
}

export interface IJourney {
  players: string[],
  bestHand: string,
  biggestEliminator: string,
  hasClosed: boolean,
  closedBy: string,
  podium?: IPodium;
  tag: Number
}

const journeySchema = new mongoose.Schema({
  players: Array,
  bestHand: String,
  biggestEliminator: String,
  hasClosed: Boolean,
  closedBy: String,
  tag: Number,
  podium: {
    first: String,
    second: String,
    third: String,
  },
});

export const JourneySchema = mongoose.model("Journey", journeySchema);

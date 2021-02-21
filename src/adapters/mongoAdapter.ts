/* eslint-disable class-methods-use-this */
import Mongoose from "mongoose";
import { IDB } from "../interfaces/db";

const journeySchema = new Mongoose.Schema({
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

const userSchema = new Mongoose.Schema({
  displayName: String,
  uid: String,
  email: String,
  dateBirth: String,
  isAdmin: Boolean,
  photoURL: String,
  points: Number,
});

const SpaceSchema = Mongoose.model("Space", new Mongoose.Schema({
  name: String,
  uuid: String,
  users: [userSchema],
  journeys: [journeySchema],
}));

export class MongoAdapter<T> implements IDB<T> {
  async fetch(): Promise<T> {
    const response = await SpaceSchema.find({ });

    return response as unknown as T;
  }

  async getById(id: string): Promise<T> {
    const response = await SpaceSchema.findOne({ _id: id });

    return response as unknown as T;
  }

  async save(data: T): Promise<T> {
    const response = await SpaceSchema.create(data);

    return response as unknown as T;
  }

  async update(id: string, data: T): Promise<T> {
    const response = await SpaceSchema.updateOne({ _id: id }, { ...data });
    console.log(response);

    return response as unknown as T;
  }

  async delete(id: string): Promise<T> {
    const response = await SpaceSchema.deleteOne({ _id: id });

    return response as unknown as T;
  }
}

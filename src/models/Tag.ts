import mongoose from "mongoose";

export interface ITag {
  _id?: String
  lastTag: number
}

const tagSchema = new mongoose.Schema({
  lastTag: Number,
});

export const TagSchema = mongoose.model("Tag", tagSchema);

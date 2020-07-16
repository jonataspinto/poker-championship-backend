import { Document } from "mongoose";

export interface Serie {
  category: string;
  players: Array<Document>;
}

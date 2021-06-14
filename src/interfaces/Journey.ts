import { IPodium } from "./Podium";

export interface IJourney {
  uuid: string,
  players: string[],
  bestHand: string,
  biggestEliminator: string,
  hasClosed: boolean,
  closedBy: string,
  podium?: IPodium;
  tag: number;
}

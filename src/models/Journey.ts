import { IPodium } from "./Podium";

export interface IJourney {
  players: string[],
  bestHand: string,
  biggestEliminator: string,
  hasClosed: boolean,
  closedBy: string,
  podium?: IPodium;
  tag: number;
}

export class Journey implements IJourney {
  public players: Array<string>;

  public bestHand: string;

  public biggestEliminator: string;

  public hasClosed: boolean;

  public closedBy: string;

  public podium: IPodium;

  public tag: number;

  constructor({
    players,
    bestHand,
    biggestEliminator,
    hasClosed,
    closedBy,
    podium = {
      first: "",
      second: "",
      third: "",
    },
    tag,
  }: IJourney) {
    this.players = players;
    this.bestHand = bestHand;
    this.biggestEliminator = biggestEliminator;
    this.hasClosed = hasClosed;
    this.closedBy = closedBy;
    this.podium = podium;
    this.tag = tag;
  }

  get() :IJourney {
    return {
      players: this.players,
      bestHand: this.bestHand,
      biggestEliminator: this.biggestEliminator,
      hasClosed: this.hasClosed,
      closedBy: this.closedBy,
      podium: this.podium,
      tag: this.tag,
    };
  }
}

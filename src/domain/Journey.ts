import { BaseEntity } from "@Domains/BaseEntity";

export class Journey<IDProviderAdapter extends IIdProvider> extends BaseEntity<IDProviderAdapter> {
  players: string[];

  bestHand: string;

  biggestEliminator: string;

  hasClosed: boolean;

  closedBy: string;

  podium?: IPodium;

  tag: number;

  createdAt: string;

  seasonId: string;

  constructor(journey: IJourney, idProvider: IDProviderAdapter) {
    super(idProvider);
    this.bestHand = journey.bestHand || "";
    this.biggestEliminator = journey.biggestEliminator || "";
    this.closedBy = journey.closedBy || "";
    this.hasClosed = journey.hasClosed || false;
    this.players = journey.players || [];
    this.podium = journey.podium || {
      first: "",
      second: "",
      third: "",
      fourth: "",
      fifth: "",
    };
    this.tag = journey.tag;
    this.createdAt = journey.createdAt;
    this.seasonId = journey.seasonId;
  }
}

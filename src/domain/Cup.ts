import { BaseEntity } from "@Domains/BaseEntity";

export class Cup<IDProviderAdapter extends IIdProvider> extends BaseEntity<IDProviderAdapter> {
  private cup: ICup

  constructor(idProvider: IDProviderAdapter) {
    super(idProvider);
    this.cup = {} as ICup;
  }

  create(cupData: ICup) {
    this.cup.uuid = this.uuid;
    this.cup.seasonId = cupData.seasonId;
    this.cup.tag = cupData.tag;
    this.cup.createdAt = cupData.createdAt;
    this.cup.players = cupData.players || [];
    this.cup.bestHand = cupData.bestHand || "";
    this.cup.biggestEliminator = cupData.biggestEliminator || "";
    this.cup.hasClosed = cupData.hasClosed || false;
    this.cup.closedBy = cupData.closedBy || "";
    this.cup.podium = cupData.podium || {
      first: "",
      second: "",
      third: "",
      fourth: "",
      fifth: "",
    };

    return this.cup;
  }
}

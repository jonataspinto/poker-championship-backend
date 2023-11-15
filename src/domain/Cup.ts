import { BaseEntity } from "./BaseEntity";

export class Cup<IDProviderAdapter extends IIdProvider> extends BaseEntity<IDProviderAdapter> {
  private cup: ICup

  constructor(idProvider: IDProviderAdapter) {
    super(idProvider);
    this.cup = {} as ICup;
  }

  create(cupData: Omit<ICup, "uuid">) {
    this.cup.uuid = this.generateUuid();
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

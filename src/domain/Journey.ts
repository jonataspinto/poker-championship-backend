import { IIdProvider } from "../interfaces/IdProvider";
import { IJourney } from "../interfaces/Journey";
import { BaseEntity } from "./BaseEntity";

export class Journey<IDProviderAdapter extends IIdProvider> extends BaseEntity<IDProviderAdapter> {
  private journey: IJourney

  constructor(idProvider: IDProviderAdapter) {
    super(idProvider);
    this.journey = {} as IJourney;
  }

  create(journeyData: IJourney) {
    this.journey.uuid = this.uuid;
    this.journey.bestHand = journeyData.bestHand || "";
    this.journey.biggestEliminator = journeyData.biggestEliminator || "";
    this.journey.closedBy = journeyData.closedBy || "";
    this.journey.hasClosed = journeyData.hasClosed || false;
    this.journey.players = journeyData.players || [];
    this.journey.podium = journeyData.podium || {
      first: "",
      second: "",
      third: "",
      fourth: "",
      fifth: "",
    };
    this.journey.tag = journeyData.tag;
    this.journey.createdAt = journeyData.createdAt;

    return this.journey;
  }
}

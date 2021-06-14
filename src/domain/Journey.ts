// import { IJourney, IIdProvider } from "@Interfaces";
// import { IAddress } from "src/interfaces/Address";
import { IIdProvider } from "src/interfaces/IdProvider";
import { IJourney } from "src/interfaces/Journey";
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
    this.journey.podium = journeyData.podium;
    this.journey.tag = journeyData.tag;

    return this.journey;
  }
}

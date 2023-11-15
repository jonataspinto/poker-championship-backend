import { BaseEntity } from "./BaseEntity";

export class Journey<IDProviderAdapter extends IIdProvider> extends BaseEntity<IDProviderAdapter> {
  data?: IJourney;

  constructor(idProvider: IDProviderAdapter, journey?: IJourney) {
    super(idProvider);

    if (journey?.uuid) {
      this.data = { ...journey };
    }
  }

  create(journey: IJourney) {
    const draft: IJourney = {} as IJourney;
    draft.uuid = this.generateUuid();
    draft.bestHand = journey.bestHand || "";
    draft.biggestEliminator = journey.biggestEliminator || "";
    draft.closedBy = journey.closedBy || "";
    draft.hasClosed = journey.hasClosed || false;
    draft.players = journey.players || [];
    draft.podium = journey.podium || {
      first: "",
      second: "",
      third: "",
      fourth: "",
      fifth: "",
    };
    draft.tag = journey.tag;
    draft.createdAt = journey.createdAt;
    draft.seasonId = journey.seasonId;
    this.data = { ...draft };
  }
}

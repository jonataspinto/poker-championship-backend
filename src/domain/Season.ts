import { IIdProvider } from "../interfaces/IdProvider";
import { ISeason } from "../interfaces/Season";
import { BaseEntity } from "./BaseEntity";

export class Season<IDProviderAdapter extends IIdProvider> extends BaseEntity<IDProviderAdapter> {
  private season: ISeason

  constructor(idProvider: IDProviderAdapter) {
    super(idProvider);
    this.season = {} as ISeason;
  }

  create(seasonData: ISeason) {
    this.season.uuid = this.uuid;
    this.season.tag = seasonData.tag;
    this.season.journeys = [];
    this.season.hasClosed = seasonData.hasClosed || false;
    this.season.closedBy = seasonData.closedBy || "";
    this.season.createdAt = seasonData.createdAt;

    return this.season;
  }
}

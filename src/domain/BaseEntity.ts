import { IIdProvider } from "../interfaces";

export class BaseEntity<IDProviderAdapter extends IIdProvider> {
  uuid: string;

  constructor(idProvider: IDProviderAdapter) {
    this.uuid = idProvider.getNew();
  }
}

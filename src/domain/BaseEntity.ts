import { IIdProvider } from "@Interfaces";

export class BaseEntity<IDProviderAdapter extends IIdProvider> {
  uuid: string;

  constructor(idProvider: IDProviderAdapter) {
    this.uuid = idProvider.getNew();
  }
}

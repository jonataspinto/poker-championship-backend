// import { IIdProvider } from "@Interfaces";

import { IIdProvider } from "src/interfaces/IdProvider";

export class BaseEntity<IDProviderAdapter extends IIdProvider> {
  uuid: string;

  constructor(idProvider: IDProviderAdapter) {
    this.uuid = idProvider.getNew();
  }
}

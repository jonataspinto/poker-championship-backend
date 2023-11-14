export class BaseEntity<IDProviderAdapter extends IIdProvider> {
  private idProvider: IDProviderAdapter;

  constructor(IdProvider: IDProviderAdapter) {
    this.idProvider = IdProvider;
  }

  generateUuid() {
    return this.idProvider.getNew();
  }
}

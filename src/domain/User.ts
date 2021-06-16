import { IAddress } from "../interfaces/Address";
import { IIdProvider } from "../interfaces/IdProvider";
import { IUser } from "../interfaces/User";
import { BaseEntity } from "./BaseEntity";

export class User<IDProviderAdapter extends IIdProvider> extends BaseEntity<IDProviderAdapter> {
  private user: IUser

  constructor(idProvider: IDProviderAdapter) {
    super(idProvider);
    this.user = {} as IUser;
  }

  create(userData: IUser) {
    this.user.uuid = userData.uuid || this.uuid;
    this.user.name = userData.name;
    this.user.dateBirth = userData.dateBirth || "";
    this.user.email = userData.email || "";
    this.user.photoURL = userData.photoURL || "";
    this.user.address = userData.address || {
      city: "",
      neighborhood: "",
      state: "",
      street: "",
      zipCode: "",
    } as IAddress;

    return this.user;
  }
}

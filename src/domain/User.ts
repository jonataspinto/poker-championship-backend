import { IUser, IIdProvider } from "@Interfaces";
import { IAddress } from "src/interfaces/Address";
import { BaseEntity } from "./BaseEntity";

export class User<IDProviderAdapter extends IIdProvider> extends BaseEntity<IDProviderAdapter> {
  private user: IUser

  constructor(idProvider: IDProviderAdapter) {
    super(idProvider);
    this.user = {} as IUser;
  }

  create(userData: IUser) {
    this.user.uuid = this.uuid;
    this.user.name = userData.name;
    this.user.dateBirth = userData.dateBirth || "";
    this.user.email = userData.email || "";
    this.user.imgSrc = userData.imgSrc || "";
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

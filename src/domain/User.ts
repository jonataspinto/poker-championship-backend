import { BaseEntity } from "@Domains/BaseEntity";

export class User<IDProviderAdapter extends IIdProvider> extends BaseEntity<IDProviderAdapter> {
  name: string;

  displayName?: string = "";

  dateBirth?: Date | string = "";

  email: string;

  photoURL?: string = "";

  address?: IAddress = {
    city: "",
    neighborhood: "",
    state: "",
    street: "",
    zipCode: "",
  };

  points: number = 0;

  isAdmin: boolean = false;

  constructor(
    userData: IUser,
    idProvider: IDProviderAdapter,
  ) {
    super(idProvider);
    this.name = userData.name;
    this.email = userData.email;
  }
}

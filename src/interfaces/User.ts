import { IAddress } from "./Address";

export interface IUser {
  id?: string;
  uuid?: string;
  name: string;
  dateBirth?: Date | string;
  email: string;
  imgSrc?: string;
  address?: IAddress;
}

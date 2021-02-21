import { uuid } from "uuidv4";

export interface IUser {
  displayName: string;
  email: string;
  dateBirth: string,
  isAdmin: boolean,
  photoURL: string;
  points: number;
  uid: string;
}

export class User implements IUser {
  public displayName: string;

  public email: string;

  public dateBirth: string;

  public isAdmin: boolean;

  public photoURL: string;

  public points: number;

  public uid: string;

  constructor({
    displayName,
    email,
    dateBirth,
    photoURL,
    isAdmin = false,
    points = 0,
  }: IUser) {
    this.displayName = displayName;
    this.email = email;
    this.dateBirth = dateBirth;
    this.isAdmin = isAdmin;
    this.photoURL = photoURL;
    this.points = points;
    this.uid = uuid();
  }

  get(): IUser {
    return {
      displayName: this.displayName,
      email: this.email,
      dateBirth: this.dateBirth,
      isAdmin: this.isAdmin,
      photoURL: this.photoURL,
      points: this.points,
      uid: this.uid,
    };
  }
}

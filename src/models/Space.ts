import { uuid } from "uuidv4";
import { IJourney } from "./Journey";
import { IUser } from "./User";

export interface ISpace {
  name: string;
  uuid: string;
  users: IUser[];
  journeys: IJourney[];
}

export class Space {
  public name: string;

  public users: Array<IUser>;

  public journeys: Array<IJourney>;

  public uuid: string;

  constructor({ name, users = [], journeys = [] }: ISpace) {
    this.name = name;
    this.users = users;
    this.journeys = journeys;
    this.uuid = uuid();
  }

  get(): ISpace {
    return {
      name: this.name,
      users: this.users,
      journeys: this.journeys,
      uuid: this.uuid,
    };
  }
}

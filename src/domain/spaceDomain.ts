/* eslint-disable no-empty-function */
import { IDB } from "../interfaces/db";
import { ISpace } from "../models";

export class SpaceDomain {
  private db: IDB<ISpace>

  constructor(DB: IDB<ISpace>) {
    this.db = DB;
  }

  save(_space: ISpace): Promise<ISpace> {
    return this.db.save(_space);
  }

  fetch(): Promise<ISpace> {
    return this.db.fetch();
  }

  getById(id: string): Promise<ISpace> {
    return this.db.getById(id);
  }

  update(id: string, _space: ISpace): Promise<ISpace> {
    return this.db.update(id, _space);
  }

  delete(id: string): Promise<ISpace> {
    console.log(id);

    return this.db.delete(id);
  }
}

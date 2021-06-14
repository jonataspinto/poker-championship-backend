/* eslint-disable class-methods-use-this */
import { v4 } from "uuid";
import { IIdProvider } from "@Interfaces";

export class IdProviderAdapter implements IIdProvider {
  getNew() {
    return v4();
  }
}

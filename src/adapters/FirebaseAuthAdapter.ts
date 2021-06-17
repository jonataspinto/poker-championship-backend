import { auth } from "firebase-admin";
import { IAuth } from "../interfaces/Auth";

export class FirebaseAuthAdapter implements IAuth {
  private isAuhenticated: boolean

  constructor() {
    this.isAuhenticated = false;
  }

  async verifyToken(token: string): Promise<boolean> {
    const result = await auth().verifyIdToken(token);

    if (result) {
      this.isAuhenticated = true;
    }

    return this.isAuhenticated;
  }
}

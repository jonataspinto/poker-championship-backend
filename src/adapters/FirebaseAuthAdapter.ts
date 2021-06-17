import { auth } from "firebase-admin";
import { IAuth } from "../interfaces/Auth";

export class FirebaseAuthAdapter implements IAuth {
  private isAuhenticated: boolean

  private userId: string

  constructor() {
    this.isAuhenticated = false;
    this.userId = "";
  }

  async verifyToken(token: string): Promise<boolean> {
    const result = await auth().verifyIdToken(token);

    if (result) {
      this.isAuhenticated = true;
    }

    return this.isAuhenticated;
  }

  async getUuidByToken(token: string): Promise<string> {
    const { user_id: userId } = await auth().verifyIdToken(token);

    if (userId) {
      this.userId = userId;
    }

    return this.userId;
  }
}

import { firebaseApp } from "../clients/firebase";

export class FirebaseAuthAdapter implements IAuth {
  private isAuhenticated: boolean;

  private userId: string;

  constructor() {
    this.isAuhenticated = false;
    this.userId = "";
  }

  async verifyToken(token: string): Promise<boolean> {
    const result = await firebaseApp.auth().verifyIdToken(token);

    if (result) {
      this.isAuhenticated = true;
    }

    return this.isAuhenticated;
  }

  async getUuidByToken(token: string): Promise<string> {
    const user_id = await firebaseApp.auth().verifyIdToken(token);

    const userId = await user_id?.uid;

    if (userId) {
      this.userId = userId;
    }

    return this.userId;
  }
}

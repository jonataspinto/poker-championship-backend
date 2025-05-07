import { firebaseApp } from "../clients/firebase";

export class FirebaseAuthAdapter implements IAuth {
  async verifyToken(token: string): Promise<boolean> {
    let isAuthenticated = false;

    const result = await firebaseApp.auth().verifyIdToken(token);

    if (result) {
      isAuthenticated = true;
    }

    return isAuthenticated;
  }

  async getUuidByToken(token: string): Promise<string> {
    const user = await firebaseApp.auth().verifyIdToken(token);

    const userUuid = user?.uid;

    if (!userUuid) {
      throw new Error("User not found");
    }

    return userUuid;
  }

  async getEmailByToken(token: string): Promise<string> {
    const user = await firebaseApp.auth().verifyIdToken(token);

    const userEmail = user?.email;

    if (!userEmail) {
      throw new Error("User email not found");
    }

    return userEmail;
  }
}

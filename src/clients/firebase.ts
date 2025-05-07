import * as app from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

export const firebaseApp = app.initializeApp({
  credential: app.credential.cert(
    {
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(
        /\\n/g,
        "\n"
      ),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL
    } /* or serviceAccount */
  ),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

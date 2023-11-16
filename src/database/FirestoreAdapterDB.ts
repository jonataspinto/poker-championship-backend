import * as dataBase from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();
// const  serviceAccount = require('../../serviceAccountKey.json')

dataBase.initializeApp({
  credential: dataBase.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  } /* or serviceAccount */),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const basePath = "/root_collection/document";

export class FirestoreAdapterDB<T> implements IDBProvider {
  private path: string

  constructor(reference: string) {
    this.path = reference;
  }

  async save<T>(data: T): Promise<T> {
    const newData = await dataBase
      .firestore()
      .collection(`${basePath}/${this.path}`)
      .add(data as FirebaseFirestore.DocumentData);

    const response = await newData.get().then((snapshot) => ({
      ...snapshot.data() as T,
      id: snapshot.id,
    }));

    return response as T;
  }

  async getAll<T>(key: string = "", queryParam: string | number = ""): Promise<T[]> {
    const list: T[] = [];

    let query;

    if (key && queryParam) {
      query = await dataBase
        .firestore()
        .collection(`${basePath}/${this.path}`)
        .where(`${key}`, "==", queryParam)
        .get();
    } else {
      query = await dataBase
        .firestore()
        .collection(`${basePath}/${this.path}`)
        .get();
    }

    query.forEach((snapshot) => list.push({
      ...(snapshot.data() as T),
      id: snapshot.id,
    }));
    return list;
  }

  async getById<T>(id: string): Promise<T> {
    const data: T | Error = await dataBase
      .firestore()
      .collection(`${basePath}/${this.path}`)
      .doc(id)
      .get()
      .then((snapshot) => snapshot.data() as T)
      .catch((err: Error) => err);

    return data as T;
  }

  async getByEmail<T>(email: string): Promise<T> {
    const list: T[] = [];
    const query = await dataBase
      .firestore()
      .collection(`${basePath}/${this.path}`)
      .where("email", "==", email)
      .get();

    query.forEach((snapshot) => list.push({
      ...(snapshot.data() as T),
      id: snapshot.id,
    }));

    return list[0];
  }

  async update<T>(id: string, newData: T): Promise<T> {
    await dataBase
      .firestore()
      .collection(`${basePath}/${this.path}`)
      .doc(id)
      .update(newData as FirebaseFirestore.UpdateData);

    return newData;
  }

  async delete(id: string): Promise<string> {
    await dataBase
      .firestore()
      .collection(`${basePath}/${this.path}`)
      .doc(id)
      .delete();
    return id;
  }
}

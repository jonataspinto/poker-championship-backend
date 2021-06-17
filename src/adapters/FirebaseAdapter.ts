import * as dataBase from "firebase-admin";
import dotenv from "dotenv";

import { IDatabase } from "../interfaces/Database";

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

export class FirestoreAdapter<T> implements IDatabase<T> {
  private path: string

  constructor(reference: string) {
    this.path = reference;
  }

  async save(data: T): Promise<T> {
    try {
      const newData = await dataBase
        .firestore()
        .collection(`${basePath}/${this.path}`)
        .add(data);

      const response = await newData.get().then((snapshot) => ({
        ...snapshot.data() as T,
        id: snapshot.id,
      }));

      return response as T;
    } catch (error) {
      return error;
    }
  }

  async getAll(): Promise<T[] | Error> {
    try {
      const list: T[] = [];
      const query = await dataBase
        .firestore()
        .collection(`${basePath}/${this.path}`)
        .get();

      query.forEach((snapshot) => list.push({
        ...(snapshot.data() as T),
        id: snapshot.id,
      }));
      return list;
    } catch (error) {
      return error;
    }
  }

  async getById(id: string): Promise<T> {
    const data: T | Error = await dataBase
      .firestore()
      .collection(`${basePath}/${this.path}`)
      .doc(id)
      .get()
      .then((snapshot) => snapshot.data() as T)
      .catch((err: Error) => err);

    return data as T;
  }

  async getByKey(key = "", value = ""): Promise<T | Error> {
    const list: T[] = [];
    const query = await dataBase
      .firestore()
      .collection(`${basePath}/${this.path}`)
      .where(`${key}`, "==", `${value}`)
      .get();

    query.forEach((snapshot) => list.push({
      ...(snapshot.data() as T),
      id: snapshot.id,
    }));

    return list[0];
  }

  async update(id: string, newData: T): Promise<T | Error> {
    await dataBase
      .firestore()
      .collection(`${basePath}/${this.path}`)
      .doc(id)
      .update(newData);

    return newData;
  }

  async delete(id: string): Promise<string | Error> {
    await dataBase
      .firestore()
      .collection(`${basePath}/${this.path}`)
      .doc(id)
      .delete();
    return id;
  }
}

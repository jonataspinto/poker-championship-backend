import { firebaseApp } from "../clients/firebase";

const dataBase = firebaseApp;

const basePath = "/root_collection/document";

export class FirestoreAdapterDB<T, DTO> implements IDBProvider<T, DTO> {
  private path: string;

  constructor(reference: string) {
    this.path = reference;
  }

  async save(data: T): Promise<DTO> {
    const newData = await dataBase
      .firestore()
      .collection(`${basePath}/${this.path}`)
      .add(data as FirebaseFirestore.DocumentData);

    const response = await newData.get().then((snapshot) => ({
      ...(snapshot.data() as T),
      id: snapshot.id,
      createdAt: snapshot.createTime?.toDate(),
      updatedAt: snapshot.updateTime?.toDate()
    }));

    return response as DTO;
  }

  async getAll<T>(
    key: string = "",
    queryParam: string | number = ""
  ): Promise<T[]> {
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

    query.forEach((snapshot) =>
      list.push({
        ...(snapshot.data() as T),
        id: snapshot.id,
        createdAt: snapshot.createTime?.toDate(),
        updatedAt: snapshot.updateTime?.toDate()
      })
    );
    return list;
  }

  async getById<T>(id: string): Promise<T> {
    const data: T | Error | null = await dataBase
      .firestore()
      .collection(`${basePath}/${this.path}`)
      .doc(id)
      .get()
      .then((snapshot) => {
        const value = snapshot.data();

        if (!value) {
          return null;
        }

        return {
          ...(value as T),
          id: snapshot.id,
          createdAt: snapshot.createTime?.toDate(),
          updatedAt: snapshot.updateTime?.toDate()
        };
      });

    return data as T;
  }

  async getByEmail<T>(email: string): Promise<T> {
    const list: T[] = [];
    const query = await dataBase
      .firestore()
      .collection(`${basePath}/${this.path}`)
      .where("email", "==", email)
      .get();

    query.forEach((snapshot) =>
      list.push({
        ...(snapshot.data() as T),
        id: snapshot.id,
        createdAt: snapshot.createTime?.toDate(),
        updatedAt: snapshot.updateTime?.toDate()
      })
    );

    return list[0];
  }

  async update(id: string, newData: T): Promise<DTO> {
    const data = await dataBase
      .firestore()
      .collection(`${basePath}/${this.path}`)
      .doc(id)
      .update(newData as Record<string, any>)
      .then(() =>
        dataBase
          .firestore()
          .collection(`${basePath}/${this.path}`)
          .doc(id)
          .get()
      )
      .then((snapshot) => ({
        ...snapshot.data(),
        id: snapshot.id,
        createdAt: snapshot.createTime?.toDate(),
        updatedAt: snapshot.updateTime?.toDate()
      }));

    return data as DTO;
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

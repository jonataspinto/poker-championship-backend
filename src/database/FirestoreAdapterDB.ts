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

  async getAll(key: string = "", queryParam: string | number = "") {
    const list: DTO[] = [];

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
        ...(snapshot.data() as DTO),
        id: snapshot.id,
        createdAt: snapshot.createTime?.toDate(),
        updatedAt: snapshot.updateTime?.toDate()
      })
    );
    return list;
  }

  async getById(id: string) {
    const data = await dataBase
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
          ...value,
          id: snapshot.id,
          createdAt: snapshot.createTime?.toDate(),
          updatedAt: snapshot.updateTime?.toDate()
        };
      });

    return data as DTO;
  }

  async getByEmail(email: string) {
    const list: DTO[] = [];

    const query = await dataBase
      .firestore()
      .collection(`${basePath}/${this.path}`)
      .where("email", "==", email)
      .get();

    query.forEach((snapshot) =>
      list.push({
        ...(snapshot.data() as DTO),
        id: snapshot.id,
        createdAt: snapshot.createTime?.toDate(),
        updatedAt: snapshot.updateTime?.toDate()
      })
    );
    //TODO: pq array?
    return list[0];
  }

  async update(id: string, newData: T) {
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

  async delete(id: string) {
    await dataBase
      .firestore()
      .collection(`${basePath}/${this.path}`)
      .doc(id)
      .delete();
    return id;
  }
}

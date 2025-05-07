import DATABASE_MOCK from "../../__mock__/database";
import { FirestoreAdapterDB } from "../../database/FirestoreAdapterDB";

class JourneysRepository implements Repository<Journey, JourneyDTO> {
  constructor(private dbProvider: IDBProvider<Journey, JourneyDTO>) {}

  async create(payload: Journey) {
    return this.dbProvider.save(payload);
  }

  async findAll() {
    return this.dbProvider.getAll();
  }

  async findById(id: string) {
    return this.dbProvider.getById(id);
  }

  async delete(id: string) {
    return this.dbProvider.delete(id);
  }

  async update(id: string, payload: Journey) {
    return this.dbProvider.update(id, payload);
  }
}

export default new JourneysRepository(
  process.env.NODE_ENV === "test"
    ? DATABASE_MOCK
    : new FirestoreAdapterDB("journeys")
);

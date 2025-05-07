import DATABASE_MOCK from "../../__mock__/database";
import { FirestoreAdapterDB } from "../../database/FirestoreAdapterDB";

class SeasonRepository implements Repository<ISeason, ISeasonDTO> {
  constructor(private dbProvider: IDBProvider<ISeason, ISeasonDTO>) {}

  async create(payload: ISeason) {
    const data = await this.dbProvider.save(payload);
    return data;
  }

  async findAll() {
    const seasons = await this.dbProvider.getAll();
    return seasons;
  }

  async findById(id: string) {
    const season = await this.dbProvider.getById(id);
    return season;
  }

  async update(id: string, payload: ISeason) {
    const updatedSeason = await this.dbProvider.update(id, payload);
    return updatedSeason;
  }

  async delete(id: string) {
    const deletedSeasonId = await this.dbProvider.delete(id);
    return deletedSeasonId;
  }
}

export default new SeasonRepository(
  process.env.NODE_ENV === "test"
    ? DATABASE_MOCK
    : new FirestoreAdapterDB("seasons")
);

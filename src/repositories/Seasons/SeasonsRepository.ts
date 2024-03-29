import DATABASE_MOCK from "../../__mock__/database";
import { FirestoreAdapterDB } from "../../database/FirestoreAdapterDB";

class SeasonRepository implements Repository<ISeason, ISeasonDTO> {
  constructor(private dbProvider: IDBProvider) {}

  async create(payload: ISeason) {
    const data = await this.dbProvider.save<ISeason, ISeasonDTO>(payload);
    return data;
  }

  async findAll() {
    const seasons = await this.dbProvider.getAll<ISeasonDTO>();
    return seasons;
  }

  async findById(id: string) {
    const season = await this.dbProvider.getById<ISeasonDTO>(id);
    return season;
  }

  async update(id: string, payload: ISeasonDTO) {
    const updatedSeason = await this.dbProvider.update<ISeasonDTO>(id, payload);
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
    : new FirestoreAdapterDB("seasons"),
);

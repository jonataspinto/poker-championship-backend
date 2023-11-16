import DATABASE_MOCK from "../../__mock__/database";
import { FirestoreAdapterDB } from "../../database/FirestoreAdapterDB";

class PlayersRepository implements Repository<IPlayer, IPlayerDTO> {
  private dbProvider

  constructor(dbProvider: IDBProvider) {
    this.dbProvider = dbProvider;
  }

  async create(payload: IPlayer) {
    const data = await this.dbProvider.save<IPlayer, IPlayerDTO>(payload);
    return data;
  }

  async findAll() {
    const data = await this.dbProvider.getAll<IPlayerDTO>();
    return data;
  }

  async findById(id: string) {
    const data = await this.dbProvider.getById<IPlayerDTO>(id);
    return data;
  }

  async findByEmail(email: string) {
    const data = await this.dbProvider.getByEmail<IPlayerDTO>(email);
    return data;
  }

  async delete(id: string) {
    const data = await this.dbProvider.delete(id);
    return data;
  }

  async update(id: string, payload: IPlayerDTO) {
    const data = await this.dbProvider.update<IPlayerDTO>(id, payload);
    return data;
  }
}

export default new PlayersRepository(
  process.env.NODE_ENV === "test"
    ? DATABASE_MOCK
    : new FirestoreAdapterDB("users"),
);

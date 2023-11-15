import DATABASE_MOCK from "@/__mock__/database";

class PlayersRepository implements Repository<IPlayer> {
  private dbProvider

  constructor(dbProvider: IDBProvider) {
    this.dbProvider = dbProvider;
  }

  async create(payload: IPlayer) {
    const data = await this.dbProvider.save(payload);
    return data;
  }

  async findAll() {
    const data = await this.dbProvider.getAll<IPlayer>();
    return data;
  }

  async findById(id: string) {
    const data = await this.dbProvider.getById<IPlayer>(id);
    return data;
  }

  async findByEmail(email: string) {
    const data = await this.dbProvider.getByEmail<IPlayer>(email);
    return data;
  }

  async delete(id: string) {
    const data = await this.dbProvider.delete(id);
    return data;
  }

  async update(id: string, payload: IPlayer) {
    const data = await this.dbProvider.update<IPlayer>(id, payload);
    return data;
  }
}

export default new PlayersRepository(DATABASE_MOCK);

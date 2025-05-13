export class PlayersRepository implements Repository<Player, PlayerDTO> {
  private dbProvider;

  constructor(dbProvider: IDBProvider<Player, PlayerDTO>) {
    this.dbProvider = dbProvider;
  }

  async create(payload: Player) {
    const data = await this.dbProvider.save(payload);
    return data;
  }

  async findAll() {
    const data = await this.dbProvider.getAll();
    return data;
  }

  async findById(id: string) {
    const data = await this.dbProvider.getById(id);
    return data;
  }

  async findByEmail(email: string) {
    const data = await this.dbProvider.getByEmail(email);
    return data;
  }

  async delete(id: string) {
    const data = await this.dbProvider.delete(id);
    return data;
  }

  async update(id: string, payload: Player) {
    const data = await this.dbProvider.update(id, payload);
    return data;
  }
}

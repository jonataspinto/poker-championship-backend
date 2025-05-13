export class SeasonsRepository implements Repository<Season, SeasonDTO> {
  constructor(private dbProvider: IDBProvider<Season, SeasonDTO>) {}

  async create(payload: Season) {
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

  async update(id: string, payload: Season) {
    const updatedSeason = await this.dbProvider.update(id, payload);
    return updatedSeason;
  }

  async delete(id: string) {
    const deletedSeasonId = await this.dbProvider.delete(id);
    return deletedSeasonId;
  }
}

export class JourneyTagsRepository
  implements Repository<JourneyTag, JourneyTagDTO>
{
  constructor(private dbProvider: IDBProvider<JourneyTag, JourneyTagDTO>) {}

  async create({ seasonId }: JourneyTag) {
    const tags = await this.dbProvider.getAll();

    const filteredTags = tags.filter((tag) => tag.seasonId === seasonId);

    const orderedList = filteredTags?.sort((a, b) => b.tagNumber - a.tagNumber);

    const lastTag = orderedList?.[0];

    const tagNumber = lastTag ? lastTag.tagNumber + 1 : 1;

    return this.dbProvider.save({
      seasonId,
      tagNumber
    });
  }

  async findAll() {
    return this.dbProvider.getAll();
  }

  async findById(id: string) {
    return this.dbProvider.getById(id);
  }

  async update(id: string, payload: JourneyTag) {
    return this.dbProvider.update(id, payload);
  }

  async delete(id: string) {
    return this.dbProvider.delete(id);
  }
}

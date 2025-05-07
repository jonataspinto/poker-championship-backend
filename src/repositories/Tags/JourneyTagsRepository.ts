import DATABASE_MOCK from "../../__mock__/database";
import { FirestoreAdapterDB } from "../../database/FirestoreAdapterDB";

class JourneyTagsRepository implements Repository<JourneyTag, JourneyTagDTO> {
  constructor(private dbProvider: IDBProvider) {}

  async create({ seasonId }: JourneyTag) {
    const tags = await this.dbProvider.getAll<JourneyTagDTO>();

    const filteredTags = tags.filter((tag) => tag.seasonId === seasonId);

    const orderedList = filteredTags?.sort((a, b) => b.tagNumber - a.tagNumber);

    const lastTag = orderedList?.[0];

    const tagNumber = lastTag ? lastTag.tagNumber + 1 : 1;

    return this.dbProvider.save<JourneyTag, JourneyTagDTO>({
      seasonId,
      tagNumber
    });
  }

  async findAll() {
    return this.dbProvider.getAll<JourneyTagDTO>();
  }

  async findById(id: string) {
    return this.dbProvider.getById<JourneyTagDTO>(id);
  }

  async update(id: string, payload: JourneyTag) {
    return this.dbProvider.update<JourneyTag, JourneyTagDTO>(id, payload);
  }

  async delete(id: string) {
    return this.dbProvider.delete(id);
  }
}

export default new JourneyTagsRepository(
  process.env.NODE_ENV === "test"
    ? DATABASE_MOCK
    : new FirestoreAdapterDB("journey-tags")
);

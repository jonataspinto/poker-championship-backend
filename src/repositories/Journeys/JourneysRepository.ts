import DATABASE_MOCK from "../../__mock__/database";
import { FirestoreAdapterDB } from "../../database/FirestoreAdapterDB";

class JourneysRepository implements Repository<IJourney, IJourneyDTO> {
  constructor(private dbProvider: IDBProvider) {}

  async create(payload: IJourney) {
    const journey = await this.dbProvider.save<IJourney, IJourneyDTO>(payload);

    return journey;
  }

  async findAll() {
    const journeys = await this.dbProvider.getAll<IJourneyDTO>();

    return journeys;
  }

  async findById(id: string) {
    const journey = await this.dbProvider.getById<IJourneyDTO>(id);

    return journey;
  }

  async delete(id: string) {
    const journeyId = await this.dbProvider.delete(id);

    return journeyId;
  }

  async update(id: string, payload: IJourneyDTO) {
    const updatedJourney = await this.dbProvider.update<IJourneyDTO>(id, payload);
    return updatedJourney;
  }
}

export default new JourneysRepository(
  process.env.NODE_ENV === "test"
    ? DATABASE_MOCK
    : new FirestoreAdapterDB("journeys"),
);

import { DATABASE_MOCK } from "../../__mock__/database";
import { JourneysRepository } from "./JourneysRepository";

const journeyDataMock: Journey = {
  tag: 1,
  hasClosed: false,
  players: [],
  bestHand: "",
  biggestEliminator: "",
  closedBy: "",
  seasonId: "5675785ghdvaj"
};

describe("JourneysRepository", () => {
  const journeysRepository = new JourneysRepository(new DATABASE_MOCK());
  let createdJourneyId = "";
  let createdJourneyCreatedAt = "";

  it("should create a journey correctly", async () => {
    const journey = await journeysRepository.create(journeyDataMock);

    createdJourneyId = journey.id;
    createdJourneyCreatedAt = journey.createdAt;

    expect(journey.tag).toBe(1);
    expect(!!journey.id).toBeTruthy();
  });

  it("should to return a list of journeys", async () => {
    const journeys = await journeysRepository.findAll();

    expect(journeys).not.toHaveLength(0);
  });

  it("should to return a journey for id passed as param", async () => {
    const journey = await journeysRepository.findById(createdJourneyId);

    expect(journey.id).toBe(createdJourneyId);
    expect(journey.hasClosed).toBeFalsy();
  });

  it("should to delete journey", async () => {
    const deletedJourneyId = await journeysRepository.delete(createdJourneyId);

    expect(deletedJourneyId).toBe(createdJourneyId);

    const journeys = await journeysRepository.findAll();

    expect(journeys).toHaveLength(0);
  });
});

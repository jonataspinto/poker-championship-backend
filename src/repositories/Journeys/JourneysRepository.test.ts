import JourneysRepository from "./JourneysRepository";

const journeyDataMock: IJourney = {
  tag: 1,
  hasClosed: false,
  players: [],
  bestHand: "",
  biggestEliminator: "",
  closedBy: "",
  seasonId: "5675785ghdvaj",
};

describe("JourneysRepository", () => {
  let createdJourneyId = "";
  let createdJourneyCreatedAt = "";

  it("should create a journey correctly", async () => {
    const journey = await JourneysRepository.create(journeyDataMock);

    createdJourneyId = journey.id;
    createdJourneyCreatedAt = journey.createdAt;

    expect(journey.tag).toBe(1);
    expect(!!journey.id).toBeTruthy();
  });

  it("should to return a list of journeys", async () => {
    const journeys = await JourneysRepository.findAll();

    expect(journeys).not.toHaveLength(0);
  });

  it("should to return a journey for id passed as param", async () => {
    const journey = await JourneysRepository.findById(createdJourneyId);

    expect(journey.id).toBe(createdJourneyId);
    expect(journey.hasClosed).toBeFalsy();
  });

  it("should to delete journey", async () => {
    const deletedJourneyId = await JourneysRepository.delete(createdJourneyId);

    expect(deletedJourneyId).toBe(createdJourneyId);

    const journeys = await JourneysRepository.findAll();

    expect(journeys).toHaveLength(0);
  });
});

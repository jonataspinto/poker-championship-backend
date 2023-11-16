import SeasonRepository from "./SeasonsRepository";

const seasonDataMock: ISeason = {
  tag: 1,
  hasClosed: true,
  journeys: [],
  closedBy: undefined,
};

describe("SeasonRepository", () => {
  let createdSeasonId = "";
  let createdSeasonCreatedAt = "";

  it("should create a season correctly", async () => {
    const season = await SeasonRepository.create(seasonDataMock);

    createdSeasonId = season.id;
    createdSeasonCreatedAt = season.createdAt;

    expect(season.tag).toBe(1);
    expect(!!season.id).toBeTruthy();
  });

  it("should to return a list with list of seasons", async () => {
    const seasons = await SeasonRepository.findAll();

    expect(seasons).not.toHaveLength(0);
  });

  it("should to return a season for id passed as param", async () => {
    const season = await SeasonRepository.findById(createdSeasonId);

    expect(season.id).toBe(createdSeasonId);
    expect(season.hasClosed).toBeTruthy();
  });

  it("should to update season correctly", async () => {
    const updatedSeason = await SeasonRepository.update(
      createdSeasonId,
      {
        ...seasonDataMock,
        hasClosed: false,
        id: createdSeasonId,
        createdAt: createdSeasonCreatedAt,
      },
    );

    expect(updatedSeason.hasClosed).toBeFalsy();
  });

  it("should to delete session", async () => {
    const deletedSession = await SeasonRepository.delete(createdSeasonId);

    expect(deletedSession).toBe(createdSeasonId);

    const seasons = await SeasonRepository.findAll();

    expect(seasons).toHaveLength(0);
  });
});

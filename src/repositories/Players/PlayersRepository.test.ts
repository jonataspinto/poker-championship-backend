import PlayersRepository from "./PlayersRepository";

const playerMock = {
  id: "1",
  name: "John Doe",
  email: "john@email",
};

describe("PlayersRepository", () => {
  let playerIdMock = "";

  it("should create a player correctly", async () => {
    const createdPlayer = await PlayersRepository.create(playerMock);
    playerIdMock = createdPlayer.id;
    expect(createdPlayer.name).toEqual(playerMock.name);
    expect(createdPlayer.email).toEqual(playerMock.email);
  });

  it("should to return a list of players", async () => {
    const list = await PlayersRepository.findAll();

    expect(list).toHaveLength(1);
  });

  it("should to return a player", async () => {
    const playerData = await PlayersRepository.findById(playerIdMock);

    expect(playerData.name).toBe(playerMock.name);
  });

  it("should to return a player based on email value", async () => {
    const playerData = await PlayersRepository.findByEmail(playerMock.email);

    expect(playerData.name).toBe(playerMock.name);
    expect(playerData.email).toBe(playerMock.email);
  });

  it("should to update player value", async () => {
    const updatedPlayerValue = { ...playerMock, id: playerIdMock, name: "Michael" };
    const response = await PlayersRepository.update(playerIdMock, updatedPlayerValue);

    expect(response).toMatchObject(updatedPlayerValue);
  });

  it("should to delete player value", async () => {
    const response = await PlayersRepository.delete(playerIdMock);

    expect(response).toBe(playerIdMock);
  });
});

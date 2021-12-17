import { IIdProvider, IJourney } from "../interfaces";
import { Journey } from "./Journey";

const uuidMock = "poker";

const journeyDataMock: IJourney = {
  players: [
    "EgYq7Lw1nBNTm7pfmHpRWeXcytE3",
    "x6g5nJDVACPhk702SSLkPlmsKxA2",
    "BohJFMqP9JOQATmXAnQVbsohp6t2",
    "y1hDyMJJbfdBz1o76czI4mHidss1",
    "VSkdeH6PxrgFS1L4e0YcashyWfz2",
    "YzAXWUMnFeaR1N1EqrM80dtD8HI3",
  ],
  seasonId: "jdksodjskodmoknd",
  createdAt: "2021-06-30T00:42:58-03:00",
} as IJourney;

const idProviderMock: IIdProvider = {
  getNew: jest.fn(() => uuidMock),
};

describe("Journey domain", () => {
  const journey = new Journey(journeyDataMock, idProviderMock);

  it("should to create a new journey", () => {
    expect(journey).toMatchObject(journeyDataMock);
  });

  it("should to call getNew method", () => {
    expect(idProviderMock.getNew).toHaveBeenCalled();
    expect(idProviderMock.getNew).toHaveReturned();
  });

  it("should return a uuid to equal uuidMock", () => {
    expect(journey.uuid).toEqual(uuidMock);
  });
});

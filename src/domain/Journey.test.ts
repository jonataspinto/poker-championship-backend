import { Journey } from "@/domain/Journey";
import { idProviderMock } from "@/__mock__/idProviderMock";

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

describe("Journey domain", () => {
  const journey = new Journey(idProviderMock);

  it("should to create a new journey", () => {
    journey.create(journeyDataMock);
    expect(journey.data).toMatchObject(journeyDataMock);
  });

  it("should to call getNew method", () => {
    expect(idProviderMock.getNew).toHaveBeenCalled();
    expect(idProviderMock.getNew).toHaveReturned();
  });
});

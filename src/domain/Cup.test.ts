import { Cup } from "@/domain/Cup";
import { idProviderMock, uuidMock } from "@/__mock__/idProviderMock";

const mockCupData = {
  seasonId: "jdksodjskodmoknd",
  createdAt: "2021-06-30T00:42:58-03:00",
  players: [
    "EgYq7Lw1nBNTm7pfmHpRWeXcytE3",
    "x6g5nJDVACPhk702SSLkPlmsKxA2",
    "BohJFMqP9JOQATmXAnQVbsohp6t2",
    "y1hDyMJJbfdBz1o76czI4mHidss1",
    "VSkdeH6PxrgFS1L4e0YcashyWfz2",
    "YzAXWUMnFeaR1N1EqrM80dtD8HI3",
  ],
  bestHand: "",
  biggestEliminator: "",
  hasClosed: false,
  closedBy: "",
  tag: 0,
};

describe("Cup entity", () => {
  it("should create a valid cup instance", () => {
    const cup = new Cup(idProviderMock);

    cup.create(mockCupData);

    expect(idProviderMock.getNew).toHaveBeenCalled();
    // expect(cup.uuid).not.toEqual(uuidMock);
  });
});

import { orderPlayersRanking } from ".";

const players = [
  {
    id: "AuHRWSSZ7s6Y5WAOU2GG",
    name: "mark",
    email: "mark@gmail.com",
    points: 10,
    isAdmin: false,
    podiums: {
      first: 2,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0
    }
  },
  {
    id: "6IvKHX7W1AHDOWvovKr9",
    name: "andrew",
    email: "andrew@gmail.com",
    points: 20,
    isAdmin: true,
    podiums: {
      first: 0,
      second: 1,
      third: 1,
      fourth: 0,
      fifth: 0
    }
  }
];

const playersTiedPoints = [
  {
    id: "8o9naaJ2Na5I3Nw9MLN0",
    name: "phil",
    email: "phil@gmail.com",
    points: 5,
    isAdmin: false,
    podiums: {
      first: 2,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0
    }
  },
  {
    id: "8o9naaJ2Na5I3Nw9MLN0",
    name: "nick",
    email: "nick@gmail.com",
    points: 5,
    isAdmin: false,
    podiums: {
      first: 6,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0
    }
  }
];

describe("orderPlayersRanking", () => {
  it("should order players by points in descending order", () => {
    const orderedListByPoints = orderPlayersRanking([
      ...playersTiedPoints,
      ...players
    ]);
    const [first, second, third] = orderedListByPoints;
    expect(first.points).toBeGreaterThan(second.points ?? 0);
    expect(second.points).toBeGreaterThan(third.points ?? 0);
    expect(orderedListByPoints).toMatchSnapshot();
  });

  it("should order players by podiums in descending order when points are tied", () => {
    const orderedPlayers = orderPlayersRanking(playersTiedPoints);
    expect(orderedPlayers).toMatchSnapshot();
  });
});

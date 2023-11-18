interface IJourney {
  players: string[],
  bestHand: string,
  biggestEliminator: string,
  hasClosed: boolean,
  closedBy: string,
  podium?: IPodium;
  tag: number;
  seasonId: string;
}

interface IJourneyDTO extends IJourney {
  uuid: string
  id: string
  createdAt: string
}

interface ICup {
  uuid: string;
  seasonId: string;
  createdAt: string;
  players: string[];
  podium?: IPodium;
  bestHand: string;
  biggestEliminator: string;
  hasClosed: boolean;
  closedBy: string;
  tag: number;
}

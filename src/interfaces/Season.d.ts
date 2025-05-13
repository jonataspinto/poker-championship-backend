interface Season {
  tag: number;
  hasClosed: boolean;
  journeys: string[];
  closedBy?: string;
}

interface SeasonDTO extends Season {
  id: string;
  createdAt: string;
}

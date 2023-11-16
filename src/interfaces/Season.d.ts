interface ISeason {
  tag: number;
  hasClosed: boolean;
  journeys: string[];
  closedBy?: string;
}

interface ISeasonDTO extends ISeason {
  id: string;
  createdAt: string;
}

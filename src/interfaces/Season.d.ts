type Season = {
  tag: number;
  hasClosed: boolean;
  journeys: string[];
  closedBy?: string;
};

type SeasonDTO = Season & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

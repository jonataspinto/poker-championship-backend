export interface ISeason {
  uuid: string;
  tag: number;
  journeys: string[];
  hasClosed: boolean;
  closedBy: string;
  createdAt: string;
}

import { FirestoreAdapterDB } from "../database/FirestoreAdapterDB";

export class DeliveryPodiumsByPlayer {
  private dbAdapter: IDBProvider<Journey, JourneyDTO>;

  constructor(private users: IUser[]) {
    this.dbAdapter = new FirestoreAdapterDB<Journey, JourneyDTO>("journeys");
  }

  async mapPodiumByPlayer(): Promise<IUserWithPodium[]> {
    const journeys = await this.dbAdapter.getAll();

    const closedJourneys = Array.from(journeys).filter(
      (journey) => journey.hasClosed
    );

    const mappedUsers = this.users.map((user) => {
      const { id } = user;

      const podiums: IPlayerPodium = {
        first: 0,
        second: 0,
        third: 0,
        fourth: 0,
        fifth: 0
      };

      closedJourneys.forEach((journey) => {
        if (id === journey.podium?.first) {
          podiums.first += 1;
        }

        if (id === journey.podium?.second) {
          podiums.second += 1;
        }

        if (id === journey.podium?.third) {
          podiums.third += 1;
        }

        if (id === journey.podium?.fourth) {
          podiums.fourth += 1;
        }

        if (id === journey.podium?.fifth) {
          podiums.fifth += 1;
        }
      });

      return {
        ...user,
        podiums
      };
    });

    const mappedUsersOrdered = mappedUsers
      .sort((a, b) => b.podiums.fifth - a.podiums.fifth)
      .sort((a, b) => b.podiums.fourth - a.podiums.fourth)
      .sort((a, b) => b.podiums.third - a.podiums.third)
      .sort((a, b) => b.podiums.second - a.podiums.second)
      .sort((a, b) => b.podiums.first - a.podiums.first)
      .sort((a, b) => (b?.points ?? 0) - (a?.points ?? 0));

    return mappedUsersOrdered;
  }
}

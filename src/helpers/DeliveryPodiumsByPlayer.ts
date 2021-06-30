import { FirestoreAdapter } from "../adapters/FirebaseAdapter";
import { IDatabase } from "../interfaces/Database";
import { IJourney } from "../interfaces/Journey";
import { IPlayerPodium } from "../interfaces/Podium";
import { IUser } from "../interfaces/User";

export class DeliveryPodiumsByPlayer {
  private dbAdapter: IDatabase<IJourney>

  constructor(
    private users: IUser[],
  ) {
    this.dbAdapter = new FirestoreAdapter<IJourney>("journeys");
  }

  async mapPodiumByPlayer(): Promise<IUser[]> {
    const journeys = await this.dbAdapter.getAll();

    const closedJouneys = Array
      .from(journeys as IJourney[])
      .filter((journey) => journey.hasClosed);

    const mappedUsers = this.users.map((user) => {
      const { uuid } = user;

      const podiums: IPlayerPodium = {
        first: 0,
        second: 0,
        third: 0,
        fourth: 0,
        fifth: 0,
      };

      closedJouneys.forEach((journey) => {
        if (uuid === journey.podium?.first) {
          podiums.first += 1;
        }

        if (uuid === journey.podium?.second) {
          podiums.second += 1;
        }

        if (uuid === journey.podium?.third) {
          podiums.third += 1;
        }

        if (uuid === journey.podium?.fourth) {
          podiums.fourth += 1;
        }

        if (uuid === journey.podium?.fifth) {
          podiums.fifth += 1;
        }
      });

      return {
        ...user,
        podiums,
      };
    });

    return mappedUsers;
  }
}

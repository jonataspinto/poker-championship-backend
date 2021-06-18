import { FirestoreAdapter } from "../adapters/FirebaseAdapter";
import { IDatabase } from "../interfaces/Database";
import { IJourney } from "../interfaces/Journey";
import { IPodium } from "../interfaces/Podium";
import { IUser } from "../interfaces/User";

enum Points {
  "first" = 12,
  "second" = 7,
  "third" = 4,
  "fourth" = 2,
  "fifth" = 1,
  "bestHand" = 1,
  "biggesteEliminator" = 1
}

export class DeliveryPointsToPlayers {
  private podium: IPodium;

  private bestHand: string;

  private biggestEliminator: string;

  private dbAdapter: IDatabase<IUser>

  constructor(
    journeyData: IJourney,
  ) {
    this.podium = journeyData.podium || {} as IPodium;
    this.bestHand = journeyData.bestHand;
    this.biggestEliminator = journeyData.biggestEliminator;
    this.dbAdapter = new FirestoreAdapter<IUser>("users");
  }

  async deliveryPodium(): Promise<void> {
    const podium = Object.entries(this.podium as IPodium);

    podium.forEach(async (podiumPosition: Array<string>) => {
      const key = podiumPosition[0];
      const value = podiumPosition[1];
      if (value) {
        const userData = await this.dbAdapter.getByKey("uuid", value) as IUser;

        const { id, points, ...rest } = userData;

        await this.dbAdapter.update(
          id as string,
          { ...rest, points: points + parseInt(Points[key as any], 10) },
        );
      }
    });
  }

  async deliveryBiggestEliminator(): Promise<void> {
    if (this.biggestEliminator) {
      const userData = await this.dbAdapter.getByKey("uuid", this.biggestEliminator) as IUser;

      const { id, points, ...rest } = userData;

      await this.dbAdapter.update(
        id as string,
        { ...rest, points: points + Points.biggesteEliminator },
      );
    }

    await this.deliveryBestHandPoints();
  }

  async deliveryBestHandPoints(): Promise<void> {
    if (this.bestHand) {
      const userData = await this.dbAdapter.getByKey("uuid", this.bestHand) as IUser;

      const { id, points, ...rest } = userData;

      await this.dbAdapter.update(id as string, { ...rest, points: points + Points.bestHand });
    }

    await this.deliveryPodium();
  }
}

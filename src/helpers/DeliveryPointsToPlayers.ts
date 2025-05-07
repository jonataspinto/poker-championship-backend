import { FirestoreAdapterDB } from "../database/FirestoreAdapterDB";

enum Points {
  "first" = 12,
  "second" = 7,
  "third" = 4,
  "fourth" = 2,
  "fifth" = 1,
  "bestHand" = 1,
  "biggestEliminator" = 1
}

export class DeliveryPointsToPlayers {
  private podium: IPodium;

  private bestHand: string;

  private biggestEliminator: string;

  private dbAdapter: IDBProvider<IPlayer, IPlayerDTO>;

  constructor(journeyData: Journey) {
    this.podium = journeyData.podium || ({} as IPodium);
    this.bestHand = journeyData.bestHand || "";
    this.biggestEliminator = journeyData.biggestEliminator || "";
    this.dbAdapter = new FirestoreAdapterDB<IPlayer, IPlayerDTO>("users");
  }

  async deliveryPodium(): Promise<void> {
    const podium = Object.entries(this.podium) as [
      keyof IPlayerPodium,
      string
    ][];

    podium.forEach(async (podiumPosition) => {
      const key = podiumPosition[0];
      const value = podiumPosition[1];
      if (key && value) {
        const player = await this.dbAdapter.getById(value);

        const {
          id,
          points = 0,
          podiums = {
            first: 0,
            second: 0,
            third: 0,
            fourth: 0,
            fifth: 0
          },
          ...rest
        } = player;

        await this.dbAdapter.update(id as string, {
          ...rest,
          points: points + parseInt(Points[key as any], 10),
          podiums: {
            ...player.podiums,
            [key]: (podiums?.[key] || 0) + 1
          }
        });
      }
    });
  }

  async deliveryBiggestEliminator(): Promise<void> {
    if (this.biggestEliminator) {
      const player = await this.dbAdapter.getById(this.biggestEliminator);

      const { id, points = 0, ...rest } = player;

      await this.dbAdapter.update(id as string, {
        ...rest,
        points: points + Points.biggestEliminator
      });
    }
  }

  async deliveryBestHandPoints(): Promise<void> {
    if (this.bestHand) {
      const player = await this.dbAdapter.getById(this.bestHand);

      const { id, points = 0, ...rest } = player;

      await this.dbAdapter.update(id as string, {
        ...rest,
        points: points + Points.bestHand
      });
    }
  }
}

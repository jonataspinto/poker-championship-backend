/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { MongooseUpdateQuery } from "mongoose";
import { IJourney, JourneySchema } from "../models";

interface Request {
  displayName: string;
  email: string;
  dateBirth: string;
  uid?: string;
  photoURL: string;
}

class JourneyService {
  journey: IJourney = {
    players: [],
    bestHand: "",
    biggestEliminator: "",
    hasClosed: false,
    closedBy: "",
    tag: 0,
    podium: {
      first: "",
      second: "",
      third: "",
    },
  };

  // constructor() {
  //   this.journey.players = [];
  //   this.journey.bestHand = "";
  //   this.journey.biggestEliminator = "";
  //   this.journey.hasClosed = false;
  //   this.journey.closedBy = "";
  //   this.journey.tag = 0;
  //   this.journey.podium = {
  //     first: "",
  //     second: "",
  //     third: "",
  //   };
  // }

  private async insertJourney(_Journey: IJourney) {
    await JourneySchema.create(_Journey);
  }

  private async getJourney(id: string) {
    const result = await JourneySchema.findOne({ _id: id });

    return result;
  }

  private async fetchJourneys() {
    const result = await JourneySchema.find({});

    return result;
  }

  private async updateJourney({ Journey, id } : MongooseUpdateQuery<IJourney>) {
    const result = await JourneySchema.update({ _id: id }, { ...Journey });

    return result;
  }

  private async deleteJourney(id: string) {
    const result = await JourneySchema.remove({ _id: id });

    const { deletedCount } = result;

    if (deletedCount === 0) {
      throw new Error("no Journey for this _id");
    }

    return result;
  }

  public create() {
    const result = this.insertJourney(this.journey);

    return this.journey;
  }

  get(id: string) {
    return this.getJourney(id);
  }

  fetch() {
    return this.fetchJourneys();
  }

  update(Journey: IJourney, id: string) {
    if (!id) {
      throw new Error("id is required.");
    }
    return this.updateJourney({ Journey, id });
  }

  destroy(id: string) {
    if (!id) {
      throw new Error("id is required.");
    }

    const result = this.deleteJourney(id);

    return result;
  }
}

export default JourneyService;

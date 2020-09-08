/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { MongooseUpdateQuery } from "mongoose";
import {
  IJourney,
  JourneySchema,
  TagSchema,
  ITag,
} from "../models";

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

  tag: ITag = {
    lastTag: 0,
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
    if (Journey.hasClosed) {
      throw new Error("not possible update a journey closed ");
    }

    const result = await JourneySchema.update({ _id: id }, { ...Journey });

    return result;
  }

  public async create() {
    const Tag = await TagSchema.find({});

    if (Tag.length > 0) {
      const originTag: ITag = Tag[0] as unknown as ITag;

      const { _id, lastTag } = originTag;

      this.journey.tag = lastTag + 1;

      await TagSchema.updateOne({ _id }, { lastTag: lastTag + 1 });
    }

    if (Tag.length === 0) {
      await TagSchema.create(this.tag);
    }

    await this.insertJourney(this.journey);

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
}

export default JourneyService;

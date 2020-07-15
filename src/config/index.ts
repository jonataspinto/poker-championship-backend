import dotenv from "dotenv";
import mongoose from "mongoose";

const config = () => {
  dotenv.config();

  const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@clusterpoker.74q1i.mongodb.net/poker-championship?retryWrites=true&w=majority`;

  mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );
};

export default config;

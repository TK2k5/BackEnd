import * as dotenv from "dotenv";

import mongoose from "mongoose";

dotenv.config();

const connectDb = () => {
  mongoose
    .connect(process.env.MONGOOSE_URI)
    .then(() => {
      console.log("Connected to the db");
    })
    .catch((error) => {
      console.log("Cannot connect to the db", error);
    });
};

export default connectDb;

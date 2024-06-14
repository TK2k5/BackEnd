import * as dotenv from 'dotenv';

import mongoose from 'mongoose';

dotenv.config();

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI);
    console.log('MongoDb connected');
  } catch (error) {
    console.error('MongoDb connect failed');
    console.error(error.message);
    process.exit(1);
  }
};

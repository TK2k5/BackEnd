import * as dotenv from 'dotenv';

import { connectDb } from './configs/connect-db.config.js';
import express from 'express';

dotenv.config();

const app = express();

/* middlewares */
app.use(express.json());

app.get('/', (_, res) => {
  res.send('Hello world');
});

// connect mongoDb
connectDb();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

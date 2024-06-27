import * as dotenv from 'dotenv';

import connectDb from './configs/connect-db.config.js';
import express from 'express';
import rootRoutes from './routes/index.js';

dotenv.config();

const app = express();

/* middlewares */
app.use(express.json());

app.get('/', (_, res) => {
  res.send('Hello world');
});

// connect mongoDb
connectDb();

// routes
app.use('/api/v1', rootRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

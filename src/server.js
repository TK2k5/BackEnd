import * as dotenv from 'dotenv';

import { Server } from 'socket.io';
import apiDocumention from './docs/apidoc.doc.js';
import connectDB from './configs/connect-db.config.js';
import cors from 'cors';
import express from 'express';
import rootRoutes from './routes/index.js';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();

/* middlawares */
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
);

app.get('/', (_, res) => {
  res.send('Hello World');
});

// connect to MongoDB
connectDB();

// doc swagger
app.use('/documents', swaggerUi.serve, swaggerUi.setup(apiDocumention));

// routes
app.use(`/api/v1`, rootRoutes);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const data = [
  {
    _id: '668010dcb7e7cbb2aa93d922',
    nameBrand: 'nike',
    image: 'https://picsum.photos/536/354',
    status: 'active',
    country: 'Viet Nam',
    desc: 'desc 1',
    createdAt: '2024-06-29T13:49:16.774Z',
    updatedAt: '2024-09-14T10:01:39.230Z',
    products: [],
  },
  {
    _id: '668010f4a9b59397567a34cf',
    nameBrand: 'nike',
    image: 'https://picsum.photos/536/354',
    status: 'active',
    country: 'Viet Nam',
    desc: 'desc 1',
    createdAt: '2024-06-29T13:49:40.145Z',
    updatedAt: '2024-09-10T14:49:05.270Z',
    products: ['66e05b3a94bf780643d0f7eb', '66e05c6194bf780643d0f973'],
  },
];

// tạo socket
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  socket.on('messengers', () => {
    console.log('danh sách tin nhắn!');

    const messengers = [
      {
        id: 1,
        content: 'messenger 1',
      },
      {
        id: 2,
        content: 'messenger 1',
      },
    ];

    io.emit('result', messengers);
  });

  // socket.emit('send-data', data);

  socket.on('add-product', (data) => {
    io.on('add-product', (ahihi) => {
      console.log('🚀 ~ io.on ~ ahihi:', ahihi);
    });
  });
});


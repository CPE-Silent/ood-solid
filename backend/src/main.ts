import express from 'express';
import { connectToMongoDB } from './config/db';
import cors from 'cors';
import bodyParser from 'body-parser';
import routers from './routers';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(
  cors({
    origin: '*',
    exposedHeaders: ['Content-Disposition'],
  })
);

app.use(bodyParser.json());
app.use('/api', routers());
app.use('/', (req, res) => {
  res.status(404).json({ message: 'Backend Work' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`🚀 Listening at http://localhost:${port}`);
});
connectToMongoDB();
server.on('error', console.error);

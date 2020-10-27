import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';

import axios from './http/axios';
import {checkCache} from "./midlewares/cache/check-cache";
import {RedisClient} from "./db-cache/redis";

const app = express();

app.use(bodyParser.json());

app.get('/', checkCache, async (req: Request, res: Response) => {
  try {
    const todos = await axios.get('/todos');

    RedisClient.setex(req.route.path, 3600, JSON.stringify(todos.data));
    return res.json(todos.data);
  } catch (error) {
    return res.json(new Error(error));
  }
});

app.listen(3000, () => {
  console.log('Your app is running!');
})

import {NextFunction, Request, Response} from "express";
import {RedisClient} from "../../db-cache/redis";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const checkCache = (req: Request, res: Response, next: NextFunction) => {


  RedisClient.get(req.route.path, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    if (data != null) {
      const todos = JSON.parse(data);
      return res.json(todos);
    } else {
      next();
    }
  })
}

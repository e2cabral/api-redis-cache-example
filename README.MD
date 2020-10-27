### A simple way to use Redis as a cache database
This project was based in the [ITNEXT Article](https://itnext.io/learn-to-cache-your-nodejs-application-with-redis-in-6-minutes-745a574a9739) 
which explain the usage of Redis as a cache database, but there are some improvements in the 
structure of the code to make the example more clear and easy to understand.

Run the project

#### `npm start`

This extract of code ensure that the result of the request will be stored in Redis.

```ts
const todos = await axios.get('/todos');

RedisClient.setex(req.route.path, 3600, JSON.stringify(todos.data));
```

The next piece of code shows how to create a middleware to verify if there are some data stored 
in Redis or not.

```ts
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
```

Following this simple example you will be able to implements a more complex case of caching data 
with Redis.

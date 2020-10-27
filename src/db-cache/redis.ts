import redis from "redis";

const redisPort = process.env.PORT || '6379';
export const RedisClient = redis.createClient({ port: parseInt(redisPort) });

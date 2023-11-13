// IORedis connection config
import Redis from 'ioredis';
import { Injectable } from '@nestjs/common';
import Redlock from 'redlock';

const redis = new Redis({
  port: 6379, // Redis port
  host: '127.0.0.1', // Redis host
  username: 'default', // needs Redis >= 6
  password: 'my-top-secret',
  db: 0, // Defaults to 0
  retryStrategy: (times) => {
    return Math.min(times * 50, 2000);
  },
});
@Injectable()
export class RedisClient {
  private static _instance: RedisClient;
  private _redis: any;
  private _redlock: any;

  constructor() {
    this._redis = redis;
    this._redlock = new Redlock([redis], {
      driftFactor: 0.01, // time in ms
      retryCount: 10,
      retryDelay: 200, // time in ms
      retryJitter: 200, // time in ms
    });
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get redis() {
    return this._redis;
  }

  public async lock(key: any, ttl: any) {
    // return this._redlock.acquire([key], ttl);
    return this._redis.hsetnx(key, 'lock', ttl);
  }

  public async getLock(key: any) {
    return this._redis.hget(key, 'lock');
  }

  public async unlock(key) {
    // return this._redlock.release();
    return this._redis.del(key);
  }
}

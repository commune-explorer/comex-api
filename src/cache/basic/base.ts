import { REDIS } from './redis'
import { RedisKey } from '../../constants/common'
import { RedisData } from '../../models/redis'

export abstract class Cache<T extends RedisData> {
  public abstract intervalSeconds: number
  public abstract cacheKey: RedisKey

  public abstract fetch(): Promise<T>

  public async get(): Promise<T> {
    const data = await REDIS.get(this.cacheKey)
    return data as T
  }

  public async startUpdater() {
    const data = await this.fetch()
    await REDIS.set(this.cacheKey, data)
    setTimeout(() => this.startUpdater(), this.intervalSeconds * 1000)
  }
}

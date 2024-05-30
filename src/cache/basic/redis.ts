import { createClient } from 'redis'
import { IS_PRODUCTION, RedisKey } from '../../constants/common'
import { RedisData } from '../../models/redis'

const redis = createClient({
  url: IS_PRODUCTION ? 'redis://comex-redis:6379' : 'redis://localhost:6379',
})

redis.on('error', (err) => console.log('Redis Client Error', err))

redis.connect().catch(console.error)

async function set(key: RedisKey, value: RedisData) {
  await redis.set(key, JSON.stringify(value))
}

async function get(key: RedisKey): Promise<RedisData> {
  const data = await redis.get(key)
  return data ? JSON.parse(data) : {}
}

export const REDIS = { set, get }

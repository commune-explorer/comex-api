import { Cache } from './basic/base'
import axios, { AxiosResponse } from 'axios'
import { PriceRecord } from '../models/priceRecord'
import { RedisKey } from '../constants/common'
import * as fs from 'node:fs'
import path from 'node:path'

const comswapData = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'src/cache/comswap.json'), 'utf8')) as any[]

export class PriceHistoryCache extends Cache<PriceRecord[]> {
  public intervalSeconds = 4 * 60 * 60
  public cacheKey: RedisKey = 'price_history'

  public async fetch() {
    console.log('Start fetch price history...')

    try {
      const response: AxiosResponse = await axios.get(
        'https://api.coingecko.com/api/v3/coins/commune-ai/market_chart',
        {
          params: {
            vs_currency: 'usd',
            days: '365',
          },
        }
      )

      const { prices, total_volumes } = response.data

      const points: PriceRecord[] = prices.map((price: [number, number], index: number) => ({
        timestamp: Math.floor(price[0] / 1000), // Convert milliseconds to seconds
        price: price[1],
        volume: total_volumes[index] ? total_volumes[index][1] : 0, // Default volume to 0 if null
      }))

      // load comswap data at the beginning
      const startTime = Math.min(...points.map((i: PriceRecord) => i.timestamp))
      const oldPoints: PriceRecord[] = comswapData
        .map((i: any) => ({
          timestamp: Math.floor(i.date / 1000),
          price: parseFloat(i.close),
          volume: i.volume,
        }))
        .filter((i: PriceRecord) => i.timestamp < startTime)

      return [...oldPoints, ...points].sort((a: PriceRecord, b: PriceRecord) => a.timestamp - b.timestamp)
    } catch (error) {
      console.error('Error fetching price history:', error)
      throw error
    }
  }
}

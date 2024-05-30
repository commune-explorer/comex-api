import { Cache } from './basic/base'
import axios from 'axios'
import { PriceRecord } from '../models/priceRecord'
import { RedisKey } from '../constants/common'

export class PriceHistoryCache extends Cache<PriceRecord[]> {
  public intervalSeconds = 4 * 60 * 60
  public cacheKey: RedisKey = 'price_history'

  public async fetch() {
    console.log('start fetch price history...')
    const {
      data: {
        data: { points },
      },
    } = await axios.get('https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail/chart?id=29509&range=ALL')

    return Object.entries(points)
      .map(([timestamp, item]: any) => ({
        timestamp,
        price: item.v[0],
        volume: item.v[1],
      }))
      .sort((a, b) => a.timestamp - b.timestamp)
  }
}

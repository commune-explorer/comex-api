import { Cache } from './base'
import axios from 'axios'

interface PriceRecord {
  timestamp: number
  price: number
  volume: number
}

export class PriceHistoryCache extends Cache<PriceRecord[]> {
  private cache?: PriceRecord[] = undefined

  public async get() {
    if (!this.cache) {
      await this.update()
    }
    return this.cache ?? []
  }

  public async update() {
    const {
      data: {
        data: { points },
      },
    } = await axios.get('https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail/chart?id=29509&range=ALL')

    this.cache = Object.entries(points)
      .map(([timestamp, item]: any) => ({
        timestamp,
        price: item.v[0],
        volume: item.v[1],
      }))
      .sort((a, b) => a.timestamp - b.timestamp)
  }
}

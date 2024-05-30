import { Cache } from './basic/base'
import axios from 'axios'
import { CMC_KEY } from '../constants/keys'
import { TokenData } from '../models/tokenData'
import { RedisKey } from '../constants/common'

export class TokenCache extends Cache<TokenData> {
  public intervalSeconds = 60 * 60
  public cacheKey: RedisKey = 'token'

  public async fetch() {
    console.log('start fetch token...')
    const { data: data } = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      params: {
        start: '1',
        limit: '1000',
        convert: 'USD',
      },
      headers: {
        Accepts: 'application/json',
        'X-CMC_PRO_API_KEY': CMC_KEY,
      },
    })

    const communeData = data.data.find((item: any) => item.symbol === 'COMAI')
    const cache: TokenData = {
      price: communeData.quote.USD.price,
      priceChangePercentageIn24h: communeData.quote.USD.percent_change_24h,
      volumeIn24h: communeData.quote.USD.volume_24h,
      marketCap: communeData.quote.USD.market_cap,
      circulatingSupply: communeData.circulating_supply,
      totalSupply: communeData.total_supply,
    }

    return cache
  }
}

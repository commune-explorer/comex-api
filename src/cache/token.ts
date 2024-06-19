import { Cache } from './basic/base'
import axios from 'axios'
import { COINGECKO_KEY } from '../constants/keys'
import { TokenData } from '../models/tokenData'
import { RedisKey } from '../constants/common'
import { fetchDailyEmission, fetchValidatingApr } from '../api/comx'

export class TokenCache extends Cache<TokenData> {
  public intervalSeconds = 60 * 60
  public cacheKey: RedisKey = 'token'

  public async fetch() {
    console.log('start fetch token...')
    const { data: data } = await axios.get(
      'https://api.coingecko.com/api/v3/coins/commune-ai?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false',
      {
        headers: {
          Accepts: 'application/json',
          'x-cg-demo-api-key': COINGECKO_KEY,
        },
      }
    )

    // Fetch from communex python api
    const dailyEmission = await fetchDailyEmission()
    const validatingApr = await fetchValidatingApr()

    const cache: TokenData = {
      price: data.market_data.current_price.usd,
      priceChangePercentageIn24h: data.market_data.price_change_24h,
      volumeIn24h: data.market_data.total_volume.usd,
      marketCap: data.market_data.market_cap.usd,
      circulatingSupply: data.market_data.circulating_supply,
      totalSupply: data.market_data.total_supply,
      dailyEmission: dailyEmission,
      validatingApr: validatingApr,
    }

    return cache
  }
}

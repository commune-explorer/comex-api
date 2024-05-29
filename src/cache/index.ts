import { PriceHistoryCache } from './priceHistory'
import { TokenCache } from './token'

export const CACHE = {
  priceHistory: new PriceHistoryCache(),
  token: new TokenCache(),
}

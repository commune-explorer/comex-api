import { PriceHistoryCache } from './priceHistory'
import { TokenCache } from './token'
import { SubnetCache } from './subnet'
import { AccountTagCache } from './accountTags'

export const CACHE = {
  priceHistory: new PriceHistoryCache(),
  token: new TokenCache(),
  subnet: new SubnetCache(),
  accountTags: new AccountTagCache(),
}

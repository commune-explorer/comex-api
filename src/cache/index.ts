import { PriceHistoryCache } from './priceHistory'
import { TokenCache } from './token'
import { SubnetCache } from './subnet'
import { AccountTagCache } from './accountTags'
import { ExchangeAccountsCache } from './exchangeAccounts'

export const CACHE = {
  priceHistory: new PriceHistoryCache(),
  token: new TokenCache(),
  subnet: new SubnetCache(),
  exchangeAccounts: new ExchangeAccountsCache(),
  accountTags: new AccountTagCache(),
}

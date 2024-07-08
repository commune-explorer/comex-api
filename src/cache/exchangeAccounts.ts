import { Cache } from './basic/base'
import { GRAPHQL_ENDPOINT, RedisKey } from '../constants/common'
import request, { gql } from 'graphql-request'
import { AccountTag } from '../models/accountTag'

interface Response {
  transfers: {
    nodes: [{ from: string }]
    totalCount: number
  }
}
export class ExchangeAccountsCache extends Cache<AccountTag[]> {
  public intervalSeconds = 60 * 10
  public cacheKey: RedisKey = 'exchange_accounts'
  public exchangeWallets = {
    MEXC: '5Ey2oJtrRiRYceYdESf647xKJzKJuWjnpuBSegnaWoSAJnDN',
    Comswap: '5EpjMtYQsmAUH7pHXsX4YkG6WnLUjZzPZ6W4WmXb4XmsPpHN',
    wCOMAI: '5CHrSkEhPYoSChckasqHSHw3LKQdDKRNkmpMDwto18fHPYma',
  }

  private async fetchDepositAddresses(exchangeWallet: string) {
    const query = gql`
      query ($filter: TransferFilter, $offset: Int) {
        transfers(filter: $filter, offset: $offset, orderBy: BLOCK_NUMBER_DESC) {
          nodes {
            from
          }
          totalCount
        }
      }
    `
    let pages = 1
    let addresses: string[] = []
    for (let i = 0; i < pages; i++) {
      const variables = {
        filter: {
          to: {
            equalTo: `${exchangeWallet}`,
          },
        },
        offset: 100 * i,
      }
      let response = await request<Response>(GRAPHQL_ENDPOINT, query, variables)
      if (response.transfers.totalCount > 100) {
        pages = response.transfers.totalCount / 100
      }
      response.transfers.nodes.forEach((node) => {
        if (!addresses.includes(node.from)) {
          addresses.push(node.from)
        }
      })
    }
    return addresses
  }

  public async fetch() {
    console.log('Start identifying exchange accounts...')
    let cache: AccountTag[] = []

    for (const exchange of Object.entries(this.exchangeWallets)) {
      let deposits = await this.fetchDepositAddresses(exchange[1])
      console.log(`${exchange[0]} -> ${deposits.length} deposit addresses`)
      cache.push({
        tag: {
          text: exchange[0],
          color:
            exchange[0] === 'MEXC'
              ? 'rgba(68,126,242,1)'
              : exchange[0] === 'wCOMAI'
              ? 'rgba(109,153,242,1)'
              : 'rgba(237,102,102,1)',
        },
        accounts: [exchange[1], ...deposits],
      })
    }

    return cache
  }
}

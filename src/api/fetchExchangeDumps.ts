import request, { gql } from 'graphql-request'

import { GRAPHQL_ENDPOINT } from '../constants/common'
import { GraphTransfer } from '../models/graph'
import { CACHE } from '../cache'

interface Response {
  transfers: {
    nodes: GraphTransfer[]
    totalCount: number
  }
}

export async function fetchTotalDeposited(account: string, firstBlock?: number, lastBlock?: number) {
  const query = gql`
    query ($filter: TransferFilter, $offset: Int) {
      transfers(filter: $filter, offset: $offset, orderBy: BLOCK_NUMBER_DESC) {
        nodes {
          to
          amount
        }
        totalCount
      }
    }
  `
  let pages = 1
  let transfers: Map<string, number> = new Map<string, number>()
  for (let i = 0; i < pages; i++) {
    const variables = {
      filter: {
        and: {
          blockNumber: {
            lessThan: lastBlock ?? Number.MAX_VALUE,
          },
          and: {
            from: {
              equalTo: `${account}`,
            },
            blockNumber: {
              greaterThan: firstBlock ?? 0,
            },
          },
        },
      },
      offset: 100 * i,
    }
    let response = await request<Response>(GRAPHQL_ENDPOINT, query, variables)
    if (response.transfers.totalCount > 100) {
      pages = response.transfers.totalCount / 100
    }
    response.transfers.nodes.forEach((node) => {
      transfers.set(node.to, (transfers.get(node.to) ?? 0) + parseFloat(node.amount))
    })
  }

  let deposits: Map<string, number> = new Map<string, number>()
  let depositAddresses = await CACHE.exchangeAccounts.get()
  for (const transfer of transfers.entries()) {
    if (Object.values(CACHE.exchangeAccounts.exchangeWallets).includes(transfer[0])) {
      //exclude transfers from deposit addresses to hot wallets
      continue
    }
    for (const exchange of depositAddresses) {
      if (exchange.accounts.includes(transfer[0])) {
        deposits.set(exchange.tag.text, (deposits.get(exchange.tag.text) ?? 0) + transfer[1])
      }
    }
  }

  return deposits
}

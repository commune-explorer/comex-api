import request from 'graphql-request'

import { GRAPHQL_ENDPOINT } from '../constants/common'
import { GraphAccount } from '../models/graph'
import { PageParams } from '../models/pagination'
import { CACHE } from '../cache'

interface Response {
  accounts: {
    nodes: GraphAccount[]
    totalCount: number
    pageInfo: {
      hasNextPage: boolean
      hasPreviousPage: boolean
    }
  }
}

export async function fetchAccounts({ limit, offset, orderBy, account }: PageParams & { account?: string }) {
  const filter = account ? `filter: {address: {equalTo: "${account}"}}` : ''
  const query = `
{
  accounts(
    ${filter}
    first: ${limit},
    offset: ${offset},
    orderBy: ${orderBy}
  ) {
    nodes {
      id
      address
      createdAt
      updatedAt
      balanceFree
      balanceStaked
      balanceTotal
      nodeId
    }
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
  `
  let tags = await CACHE.accountTags.get()
  let accounts = (await request<Response>(GRAPHQL_ENDPOINT, query)).accounts
  for (let i = 0; i < accounts.nodes.length; i++) {
    tags.forEach((tag) => {
      if (tag.accounts.includes(accounts.nodes[i].address)) {
        accounts.nodes[i].tag = tag.tag
      }
    })
  }
  return accounts
}

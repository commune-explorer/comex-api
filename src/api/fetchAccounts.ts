import request from 'graphql-request'

import { GRAPHQL_ENDPOINT } from '../constants/common'
import { GraphAccount } from '../models/graph'
import { PageParams } from '../models/pagination'

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
  return (await request<Response>(GRAPHQL_ENDPOINT, query)).accounts
}

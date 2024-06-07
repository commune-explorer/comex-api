import request from 'graphql-request'

import { GRAPHQL_ENDPOINT } from '../constants/common'
import { GraphDelegationEvents } from '../models/graph'
import { PageParams } from '../models/pagination'

interface Response {
  delegationEvents: {
    nodes: GraphDelegationEvents[]
    totalCount: number
  }
}

export async function fetchDelegationEvents({ limit, offset, orderBy, account }: PageParams & { account?: string }) {
  const filter = account ? `filter: {account: {equalTo: "${account}"}}` : ''
  const query = `
{
  delegationEvents(
    ${filter}
    orderBy: ${orderBy}
    first: ${limit}
    offset: ${offset}
  ) {
    nodes {
      account
      action
      amount
      extrinsicId
      height
      id
      module
      netUid
      nodeId
    }
    totalCount
  }
}
  `
  return (await request<Response>(GRAPHQL_ENDPOINT, query)).delegationEvents
}

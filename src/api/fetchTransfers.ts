import request from 'graphql-request'

import { GRAPHQL_ENDPOINT } from '../constants/common'
import { GraphTransfer } from '../models/graph'
import { PageParams } from '../models/pagination'

interface Response {
  transfers: {
    nodes: GraphTransfer[]
    totalCount: number
  }
}

export async function fetchTransfers({ limit, offset, orderBy, account }: PageParams & { account?: string }) {
  const filter = account ? `filter: {from: {equalTo: "${account}"}}` : ''
  const query = `
{
  transfers(
    ${filter}
    orderBy: ${orderBy}
    first: ${limit}
    offset: ${offset}
  ) {
    nodes {
      to
      nodeId
      id
      from
      extrinsicId
      blockNumber
      amount
    }
    totalCount
  }
}
  `
  return (await request<Response>(GRAPHQL_ENDPOINT, query)).transfers
}

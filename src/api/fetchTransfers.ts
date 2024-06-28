import request from 'graphql-request'

import { GRAPHQL_ENDPOINT } from '../constants/common'
import { GraphTransfer } from '../models/graph'
import { PageParams } from '../models/pagination'
import { CACHE } from '../cache'

interface Response {
  transfers: {
    nodes: GraphTransfer[]
    totalCount: number
  }
}

export async function fetchTransfers({
  limit,
  offset,
  orderBy,
  account,
  account2,
}: PageParams & { account?: string; account2?: string }) {
  const filter = account2
    ? `filter: {and: [{or: [{from: {equalTo: "${account}"}}, {to: {equalTo: "${account}"}}]}, {or: [{from: {equalTo: "${account2}"}}, {to: {equalTo: "${account2}"}}]}]}`
    : account
    ? `filter: {or: [{from: {equalTo: "${account}"}}, {to: {equalTo: "${account}"}}]}`
    : ''
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
  let tags = await CACHE.accountTags.get()
  let transfers = (await request<Response>(GRAPHQL_ENDPOINT, query)).transfers
  for (let i = 0; i < transfers.nodes.length; i++) {
    tags.forEach((tag) => {
      if (tag.accounts.includes(transfers.nodes[i].from)) {
        transfers.nodes[i].fromTag = tag.tag
      }
      if (tag.accounts.includes(transfers.nodes[i].to)) {
        transfers.nodes[i].toTag = tag.tag
      }
    })
  }
  return transfers
}

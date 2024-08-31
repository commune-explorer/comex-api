import request from 'graphql-request'

import { GRAPHQL_ENDPOINT } from '../constants/common'
import { GraphEvent } from '../models/graph'
import { PageParams } from '../models/pagination'

interface Response {
  events: {
    nodes: GraphEvent[]
    totalCount: number
  }
}

export async function fetchEvents({
  limit,
  offset,
  orderBy,
  blockNumber,
  extrinsicId,
}: PageParams & { blockNumber: string; extrinsicId?: number }) {
  const filter = extrinsicId
    ? `filter: {and: {blockNumber: {equalTo: "${blockNumber}"}, extrinsicId: {equalTo: ${extrinsicId}}}}`
    : `filter: {blockNumber: {equalTo: "${blockNumber}"}}`
  const query = `
{
  events(
    ${filter}
    orderBy: ${orderBy}
    first: ${limit}
    offset: ${offset}
  ) {
    nodes {
      id
      blockNumber
      extrinsicId
      eventName
      module
      data
    }
    totalCount
  }
}
  `
  return (await request<Response>(GRAPHQL_ENDPOINT, query)).events
}

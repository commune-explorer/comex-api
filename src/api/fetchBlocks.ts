import request from 'graphql-request'

import { GRAPHQL_ENDPOINT } from '../constants/common'
import { GraphBlock } from '../models/graph'
import { PageParams } from '../models/pagination'

interface Response {
  blocks: {
    nodes: GraphBlock[]
    totalCount: number
  }
}

export async function fetchBlocks({ limit, offset, orderBy, height }: PageParams & { height?: string }) {
  const filter = height ? `filter: {height: {equalTo: "${height}"}}` : ''
  const query = `
{
  blocks(
    ${filter}
    orderBy: ${orderBy}
    first: ${limit}
    offset: ${offset}
  ) {
    nodes {
      id
      height
      eventCount
      hash
      parentHash
      extrinsicCount
      specVersion
      timestamp
    }
    totalCount
  }
}
  `

  return (await request<Response>(GRAPHQL_ENDPOINT, query)).blocks
}

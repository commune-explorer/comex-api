import request from 'graphql-request'

import { GRAPHQL_ENDPOINT } from '../constants/common'
import { GraphSubnetModule } from '../models/graph'

interface Response {
  modules: {
    nodes: GraphSubnetModule[]
    pageInfo: {
      hasNextPage: boolean
      endCursor: string
      startCursor: string
    }
  }
}

export async function fetchModules() {
  let nodes: GraphSubnetModule[] = []
  let cursor = ''
  while (true) {
    const query = `
{
  modules(after: "${cursor}") {
    totalCount
    nodes {
      uid
      timestamp
      registeredAt
      nodeId
      netUid
      key
      id
      address
      extrinsicId
      name
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
  `
    const response = await request<Response>(GRAPHQL_ENDPOINT, query)
    nodes = nodes.concat(response.modules.nodes)
    cursor = response.modules.pageInfo.endCursor
    if (!response.modules.pageInfo.hasNextPage) {
      break
    }
  }

  return nodes
}

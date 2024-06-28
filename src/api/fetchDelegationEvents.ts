import request from 'graphql-request'

import { GRAPHQL_ENDPOINT } from '../constants/common'
import { GraphDelegationEvents } from '../models/graph'
import { PageParams } from '../models/pagination'
import { CACHE } from '../cache'

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
  let tags = await CACHE.accountTags.get()
  let events = (await request<Response>(GRAPHQL_ENDPOINT, query)).delegationEvents
  for (let i = 0; i < events.nodes.length; i++) {
    tags.forEach((tag) => {
      if (tag.accounts.includes(events.nodes[i].module)) {
        events.nodes[i].moduleTag = tag.tag
      }
      if (tag.accounts.includes(events.nodes[i].account)) {
        events.nodes[i].accountTag = tag.tag
      }
    })
  }
  return events
}

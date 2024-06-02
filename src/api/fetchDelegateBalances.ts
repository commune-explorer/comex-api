import request from 'graphql-request'

import { GRAPHQL_ENDPOINT } from '../constants/common'
import { GraphDelegateBalance } from '../models/graph'

interface Response {
  delegateBalances: {
    nodes: GraphDelegateBalance[]
  }
}

export async function fetchDelegateBalances({ accounts }: { accounts: string[] }) {
  const query = `
{
  delegateBalances(filter: {account: {in: [${accounts.map((i) => `"${i}"`).join(',')}]}}) {
    nodes {
      id
      netUid
      lastUpdate
      account
      amount
    }
  }
}
  `
  console.log(query)
  return (await request<Response>(GRAPHQL_ENDPOINT, query)).delegateBalances.nodes
}

import request, { gql } from 'graphql-request'

import { GRAPHQL_ENDPOINT } from '../constants/common'

interface Response {
  accounts: {
    totalCount: number
  }
}

export async function fetchRank(balance: number | undefined) {
  const query = gql`
    query ($filter: AccountFilter) {
      accounts(filter: $filter) {
        totalCount
      }
    }
  `
  const variables = {
    filter: {
      balanceTotal: {
        greaterThan: `${balance ?? 0}`,
      },
    },
  }

  return (await request<Response>(GRAPHQL_ENDPOINT, query, variables)).accounts.totalCount + 1
}

import request from 'graphql-request'

import { GRAPHQL_ENDPOINT } from '../constants/common'
import { GraphExtrinsic } from '../models/graph'
import { PageParams } from '../models/pagination'

interface Response {
  extrinsics: {
    nodes: GraphExtrinsic[]
    totalCount: number
  }
}

export async function fetchExtrinsics({
  limit,
  offset,
  orderBy,
  blockNumber,
  extrinsicId,
  signer,
  id,
}: PageParams & { blockNumber?: string; extrinsicId?: number; id?: string; signer?: string }) {
  const filter = id
    ? `filter: {id: {equalTo: "${id}"}}`
    : signer
    ? `filter: {signer: {equalTo: "${signer}"}}`
    : extrinsicId
    ? `filter: {and: {{blockNumber: {equalTo: "${blockNumber}"}}, {extrinsicId: {equalTo: ${extrinsicId} }}}`
    : `filter: {blockNumber: {equalTo: "${blockNumber}"}}`

  const query = `
{
  extrinsics(
    ${filter}
    orderBy: ${orderBy}
    first: ${limit}
    offset: ${offset}
  ) {
    nodes {
      id
      module
      method
      blockNumber
      extrinsicId
      tip
      version
      signer
      success
      hash
      args
    }
    totalCount
  }
}
  `

  return (await request<Response>(GRAPHQL_ENDPOINT, query)).extrinsics
}

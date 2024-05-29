import request from 'graphql-request'

import { GRAPHQL_ENDPOINT } from '../constants/common'
import { GraphSubnetParams } from '../models/graph'

interface Response {
  subnetParams: {
    nodes: GraphSubnetParams[]
  }
}

export async function fetchSubnetParams() {
  const query = `
{
  subnetParams {
    nodes {
      id
      founder
      tempo
      founderShare
      bondsMa
      immunityPeriod
      incentiveRatio
      lastUpdate
      maxAllowedUids
      maxAllowedWeights
      maxStake
      maxWeightAge
      maximumSetWeightCallsPerEpoch
      minAllowedWeights
      minStake
      name
      netUid
      nodeId
      trustRatio
      voteMode
    }
  }
}
  `
  return (await request<Response>(GRAPHQL_ENDPOINT, query)).subnetParams.nodes
}

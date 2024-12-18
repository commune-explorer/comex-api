import request from 'graphql-request'

import { GRAPHQL_ENDPOINT } from '../constants/common'
import { GraphSubnet, GraphSubnetBurn, GraphSubnetParams } from '../models/graph'

interface Response {
  subnetParams: { nodes: GraphSubnetParams[] }
  subnets: { nodes: GraphSubnet[] }
  subnetBurns: { nodes: GraphSubnetBurn[] }
}

export async function fetchSubnetData() {
  const query = `
{
  subnets {
    nodes {
      extrinsicId
      id
      name
      netUid
      nodeId
      registeredAt
      timestamp
    }
  }
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
      voteMode
    }
  }
  subnetBurns {
    nodes {
      nodeId
      netUid
      lastUpate
      id
      burn
    }
  }
}
  `
  const data = await request<Response>(GRAPHQL_ENDPOINT, query)
  return {
    params: data.subnetParams.nodes,
    subnets: data.subnets.nodes,
    burns: data.subnetBurns.nodes,
  }
}

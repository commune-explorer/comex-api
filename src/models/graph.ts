export interface GraphSubnet {
  extrinsicId: number
  id: string
  name: string
  netUid: number
  nodeId: number
  registeredAt: number
  timestamp: number
}

export interface GraphSubnetParams {
  id: string
  founder: string
  tempo: string
  founderShare: number
  bondsMa: number
  immunityPeriod: number
  incentiveRatio: number
  lastUpdate: number
  maxAllowedUids: number
  maxAllowedWeights: number
  maxStake: number
  maxWeightAge: number
  maximumSetWeightCallsPerEpoch: number
  minAllowedWeights: number
  minStake: number
  name: string
  netUid: number
  nodeId: number
  trustRatio: number
  voteMode: string
}

export interface GraphSubnetBurn {
  nodeId: number
  netUid: number
  lastUpate: number
  id: string
  burn: number
}

export interface GraphSubnetModule {
  id: string
  uid: number
  timestamp: number
  registeredAt: number
  nodeId: number
  netUid: number
  key: string
  address: string
  extrinsicId: number
  name: string
}

export interface GraphSubnet {
  extrinsicId: number
  id: string
  name: string
  netUid: number
  nodeId: string
  registeredAt: number
  timestamp: string
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
  nodeId: string
  netUid: number
  lastUpate: number
  id: string
  burn: string
}

export interface GraphSubnetModule {
  id: string
  uid: number
  timestamp: string
  registeredAt: number
  nodeId: string
  netUid: number
  key: string
  address: string
  extrinsicId: number
  name: string
}

export interface GraphAccount {
  id: string
  address: string
  createdAt: number
  updatedAt: number
  balanceFree: string
  balanceStaked: string
  balanceTotal: string
  nodeId: string
}

export interface GraphDelegateBalance {
  id: string
  account: string
  amount: string
  lastUpdate: number
  netUid: number
}

export interface GraphDelegationEvents {
  account: string
  action: string
  amount: string
  extrinsicId: number
  height: number
  id: string
  module: string
  netUid: number
  nodeId: string
}

export interface GraphTransfer {
  to: string
  nodeId: string
  id: string
  from: string
  extrinsicId: number
  blockNumber: string
  amount: string
}

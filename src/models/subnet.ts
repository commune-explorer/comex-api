export interface SubnetInfo {
  id: number
  name: string
  activeKeys: number
  totalKeys: number
  activeValidators: number
  totalValidators: number
  activeMiners: number
  totalMiners: number
  registerCost: number

  githubUrl: string
  registeredAt: number
  registeredBy: string
  emissionPercentage: number
}

export interface SubnetModule {
  uid: number
  name: string
  netuid: number
  key: string
  emission: number
  incentive: number
  dividends: number
  delegationFee: number
  stake: number
  address: string
  inImmunity: boolean
  active: boolean
  isValidator: boolean
}

export interface SubnetParams {
  netuid: number
  founder: string
  tempo: string
  founderShare: number
  immunityPeriod: number
  incentiveRatio: number
  lastUpdate: number
  maxAllowedUids: number
  maxAllowedWeights: number
  maxStake: number
  maxWeightAge: number
  minAllowedWeights: number
  minStake: number
  voteMode: string
}

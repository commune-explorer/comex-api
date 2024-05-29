export interface ApiSubnet {
  netuid: number
  name: string
  founder: string
  founder_share: number
  immunity_period: number
  incentive_ratio: number
  max_allowed_uids: number
  max_allowed_weights: number
  min_allowed_weights: number
  max_stake: number
  min_stake: number
  tempo: number
  trust_ratio: number
  vote_mode: string
  emission: number
  max_weight_age: number
  bonds_ma: any
  maximum_set_weight_calls_per_epoch: any
  target_registrations_per_interval: number
  target_registrations_interval: number
  max_registrations_per_interval: number
  stake: number
}

export interface ApiSubnetModule {
  uid: number
  key: string
  name: string
  address: string
  emission: number
  incentive: number
  dividends: number
  balance: number | null
  stake: number
  delegation_fee: number
  in_immunity: boolean
  type: 'inactive' | 'miner' | 'validator'
}

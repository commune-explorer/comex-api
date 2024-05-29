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

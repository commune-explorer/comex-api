export type AccountOrderBy =
  | 'CREATED_AT_ASC'
  | 'CREATED_AT_DESC'
  | 'UPDATED_AT_ASC'
  | 'UPDATED_AT_DESC'
  | 'BALANCE_FREE_ASC'
  | 'BALANCE_FREE_DESC'
  | 'BALANCE_STAKED_ASC'
  | 'BALANCE_STAKED_DESC'
  | 'BALANCE_TOTAL_ASC'
  | 'BALANCE_TOTAL_DESC'

export type PageParams = { offset: number; limit: number; orderBy: AccountOrderBy }

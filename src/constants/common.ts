export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
console.info(`IS_PRODUCTION: ${IS_PRODUCTION}`)

export const GRAPHQL_ENDPOINT = 'https://api.subquery.network/sq/CommuneExplorer/commune-indexer'

export type RedisKey = 'token' | 'price_history' | 'subnets' | 'account_tags' | 'exchange_accounts'

export const BLOCKS_IN_DAY = 10_800

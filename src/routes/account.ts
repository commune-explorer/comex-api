import { FastifyInstance } from 'fastify'
import { getAccounts } from '../controllers/getAccounts'
import { getDelegationEvents } from '../controllers/getDelegationEvents'
import { getTransfers } from '../controllers/getTransfers'
import { getAccountRank } from '../controllers/getRank'
import { getDeposits } from '../controllers/getDeposits'

export async function account(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: getAccounts,
  })

  fastify.route({
    method: 'GET',
    url: '/rank',
    handler: getAccountRank,
  })

  fastify.route({
    method: 'GET',
    url: '/delegation-events',
    handler: getDelegationEvents,
  })

  fastify.route({
    method: 'GET',
    url: '/transfers',
    handler: getTransfers,
  })

  fastify.route({
    method: 'GET',
    url: '/deposits',
    handler: getDeposits,
  })
}

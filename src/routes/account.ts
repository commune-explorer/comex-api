import { FastifyInstance } from 'fastify'
import { getAccounts } from '../controllers/getAccounts'
import { getDelegationEvents } from '../controllers/getDelegationEvents'
import { getTransfers } from '../controllers/getTransfers'

export async function account(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: getAccounts,
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
}

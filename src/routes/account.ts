import { FastifyInstance } from 'fastify'
import { getAccounts } from '../controllers/getAccounts'

export async function account(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: getAccounts,
  })
}

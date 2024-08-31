import { FastifyInstance } from 'fastify'
import { getInfo } from '../controllers/getInfo'
import { getPriceHistory } from '../controllers/getPriceHistory'
export async function home(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/info',
    handler: getInfo,
  })

  fastify.route({
    method: 'GET',
    url: '/price-history',
    handler: getPriceHistory,
  })
}

import { FastifyInstance } from 'fastify'
import { getInfo } from '../controllers/getInfo'

export async function home(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/info',
    handler: getInfo,
  })
}

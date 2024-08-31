import { FastifyInstance } from 'fastify'
import { getBlocks } from '../controllers/getBlocks'

export async function block(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: getBlocks,
  })
}

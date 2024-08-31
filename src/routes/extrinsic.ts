import { FastifyInstance } from 'fastify'
import { getExtrinsics } from '../controllers/getExtrinsics'

export async function extrinsic(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: getExtrinsics,
  })
}

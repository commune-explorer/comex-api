import { FastifyInstance } from 'fastify'
import { getSubnets } from '../controllers/getSubnets'
import { getSubnet } from '../controllers/getSubnet'

export async function subnet(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: getSubnets,
  })

  fastify.route({
    method: 'GET',
    url: '/:id',
    handler: getSubnet,
  })
}

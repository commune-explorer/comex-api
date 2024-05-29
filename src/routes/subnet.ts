import { FastifyInstance } from 'fastify'
import { getSubnets } from '../controllers/getSubnets'
import { getSubnet } from '../controllers/getSubnet'
import { getSubnetModules } from '../controllers/getSubnetModules'

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

  fastify.route({
    method: 'GET',
    url: '/:id/modules',
    handler: getSubnetModules,
  })
}

import { FastifyInstance } from 'fastify'
import { getSubnets } from '../controllers/getSubnets'
import { getSubnet } from '../controllers/getSubnet'
import { getSubnetModules } from '../controllers/getSubnetModules'
import { getSubnetRegistration } from '../controllers/getSubnetRegistration'
import { getSubnetLeaderboard } from '../controllers/getSubnetLeaderboard'

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

  fastify.route({
    method: 'GET',
    url: '/:id/registration',
    handler: getSubnetRegistration,
  })

  fastify.route({
    method: 'GET',
    url: '/:id/leaderboard',
    handler: getSubnetLeaderboard,
  })
}

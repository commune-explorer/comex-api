import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'

export async function getSubnet(request: FastifyRequest, reply: FastifyReply) {
  reply.status(STANDARD.SUCCESS).send({
    data: {
      id: 1,
      activeKeys: 256,
      totalKeys: 256,
      activeValidators: 64,
      totalValidators: 64,
      activeMiners: 64,
      totalMiners: 64,
      registerCost: 100,

      githubUrl: 'https://github.com/commune/commune',
      registeredAt: '2021-08-01T00:00:00Z',
      registeredBy: '5hxxxxxxx',
      emissionPercentage: 5.31,

      modules: [
        {
          id: 1,
          address: '5ffff',
          active: true,
        },
      ],

      params: {
        immunityPeriod: 800,
      },
    },
  })
}

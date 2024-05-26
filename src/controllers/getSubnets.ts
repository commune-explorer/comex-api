import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'

export async function getSubnets(request: FastifyRequest, reply: FastifyReply) {
  reply.status(STANDARD.SUCCESS).send({
    data: {
      subnets: [
        {
          id: 1,
          activeKeys: 256,
          totalKeys: 256,
          activeValidators: 64,
          totalValidators: 64,
          activeMiners: 64,
          totalMiners: 64,
          registerCost: 100,
        },
      ],
    },
  })
}

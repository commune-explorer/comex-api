import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'

export async function getInfo(request: FastifyRequest, reply: FastifyReply) {
  reply.status(STANDARD.SUCCESS).send({
    data: {
      price: 0.82,
      priceChangePercentageIn24h: -7.14,
      volumeIn24h: 50000000,
      marketCap: 1000000000,
      circulatingSupply: 1000000000,
      totalSupply: 1000000000,
      stakingApr: 40,
    },
  })
}

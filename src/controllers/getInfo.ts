import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'
import { CACHE } from '../cache'

export async function getInfo(request: FastifyRequest, reply: FastifyReply) {
  const token = await CACHE.token.get()
  const staking = { stakingApr: 40 }

  reply.status(STANDARD.SUCCESS).send({
    data: {
      ...token,
      ...staking,
    },
  })
}

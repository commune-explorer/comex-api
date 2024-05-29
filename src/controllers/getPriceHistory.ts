import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'
import { CACHE } from '../cache'

export async function getPriceHistory(request: FastifyRequest, reply: FastifyReply) {
  const records = await CACHE.priceHistory.get()

  reply.status(STANDARD.SUCCESS).send({
    data: {
      records,
    },
  })
}

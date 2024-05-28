import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'

export async function getPriceHistory(request: FastifyRequest, reply: FastifyReply) {
  const ts = Date.now()

  const records = new Array(1000).fill(0).map((_, i) => ({
    timestamp: ts - 1000_000 + i * 1000,
    price: 0.4 + Math.random() * i * 0.001,
    volume: 100 + Math.random() * i,
  }))

  reply.status(STANDARD.SUCCESS).send({
    data: {
      records,
    },
  })
}

import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'
import { CACHE } from '../cache'

export async function getSubnets(request: FastifyRequest, reply: FastifyReply) {
  const subnets = await CACHE.subnet.get()

  reply.status(STANDARD.SUCCESS).send({
    data: { subnets: subnets.sort((a, b) => a.id - b.id) },
  })
}

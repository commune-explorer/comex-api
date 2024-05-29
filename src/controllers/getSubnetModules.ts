import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'
import { CACHE } from '../cache'

interface ParamsType {
  id: string
}

export async function getSubnetModules(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
  const { id } = request.params
  const modules = await CACHE.subnet.getModules(id)

  reply.status(STANDARD.SUCCESS).send({
    data: {
      modules,
    },
  })
}

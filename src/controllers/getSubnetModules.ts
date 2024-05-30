import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'
import { CACHE } from '../cache'

interface ParamsType {
  id: string
}

export async function getSubnetModules(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
  const { id: idStr } = request.params
  const id = parseInt(idStr)

  const modules = await CACHE.subnet.getModules(id)

  reply.status(STANDARD.SUCCESS).send({
    data: {
      modules: modules?.sort((a, b) => a.uid - b.uid),
    },
  })
}

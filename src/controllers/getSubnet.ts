import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'
import { CACHE } from '../cache'

interface ParamsType {
  id: string
}

export async function getSubnet(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
  const { id: idStr } = request.params
  const id = parseInt(idStr)

  const info = await CACHE.subnet.getSubnet(id)
  const params = await CACHE.subnet.getParams(id)

  reply.status(STANDARD.SUCCESS).send({
    data: {
      ...info,
      params,
    },
  })
}

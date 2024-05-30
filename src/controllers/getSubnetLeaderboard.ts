import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'
import { ApiSubnetMiner } from '../models/api'
import { CACHE } from '../cache'

interface ParamsType {
  id: string
}

export async function getSubnetRegistration(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
  const { id: idStr } = request.params
  const id = parseInt(idStr)

  let records: ApiSubnetMiner[] = []

  const modules = await CACHE.subnet.getModules(id)

  for (let module of modules) {
    if (module.active && !module.isValidator) {
      records.push({
        uid: module.uid,
        name: module.key,
        rank: 0,
        tokenPerDay: 0,
        usdPerDay: 0,
      })
    }
  }

  reply.status(STANDARD.SUCCESS).send({
    data: {
      records,
    },
  })
}

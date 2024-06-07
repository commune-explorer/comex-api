import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'
import { ApiSubnetMiner } from '../models/api'
import { CACHE } from '../cache'
import { BLOCKS_IN_DAY } from '../constants/common'

interface ParamsType {
  id: string
}

export async function getSubnetLeaderboard(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
  const { id: idStr } = request.params
  const id = parseInt(idStr)

  let records: ApiSubnetMiner[] = []

  const price = (await CACHE.token.get()).price
  const modules = (await CACHE.subnet.getModules(id)).sort((a, b) => b.emission - a.emission)

  for (let module of modules) {
    if (module.active && !module.isValidator) {
      const tokenPerDay = module.emission * BLOCKS_IN_DAY
      records.push({
        uid: module.uid,
        name: module.name,
        rank: records.length + 1,
        tokenPerDay,
        usdPerDay: tokenPerDay * price,
      })
    }
  }

  reply.status(STANDARD.SUCCESS).send({
    data: {
      records,
    },
  })
}

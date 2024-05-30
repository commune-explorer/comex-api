import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'
import { ApiSubnetRegistration } from '../models/api'

interface ParamsType {
  id: string
}

export async function getSubnetRegistration(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
  const { id: idStr } = request.params
  const id = parseInt(idStr)

  let records: ApiSubnetRegistration[] = []

  for (let i = 0; i < 10; i++) {
    records.push({
      timestamp: Date.now(),
      amount: Math.random() * 100,
    })
  }

  reply.status(STANDARD.SUCCESS).send({
    data: {
      records,
    },
  })
}

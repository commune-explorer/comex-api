import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'
import { AccountOrderBy } from '../models/pagination'
import { fetchTransfers } from '../api/fetchTransfers'

export async function getTransfers(request: FastifyRequest, reply: FastifyReply) {
  const {
    offset: offsetStr = '0',
    limit: limitStr = '10',
    orderBy = 'BLOCK_NUMBER_DESC',
  } = request.query as {
    offset: string
    limit: string
    orderBy: AccountOrderBy
  }

  const offset = parseInt(offsetStr)
  const limit = parseInt(limitStr)

  const { nodes, totalCount } = await fetchTransfers({ offset, limit, orderBy })

  reply.status(STANDARD.SUCCESS).send({
    data: { totalCount, records: nodes },
  })
}

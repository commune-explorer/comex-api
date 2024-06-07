import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'
import { DelegateOrderBy } from '../models/pagination'
import { fetchDelegationEvents } from '../api/fetchDelegationEvents'

export async function getDelegationEvents(request: FastifyRequest, reply: FastifyReply) {
  const {
    offset: offsetStr = '0',
    limit: limitStr = '10',
    account,
    orderBy = 'HEIGHT_DESC',
  } = request.query as {
    offset: string
    limit: string
    account?: string
    orderBy: DelegateOrderBy
  }

  const offset = parseInt(offsetStr)
  const limit = parseInt(limitStr)

  const { nodes, totalCount } = await fetchDelegationEvents({ offset, limit, orderBy, account })

  reply.status(STANDARD.SUCCESS).send({
    data: { totalCount, records: nodes },
  })
}

import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'
import { fetchAccounts } from '../api/fetchAccounts'
import { AccountOrderBy } from '../models/pagination'

export async function getAccounts(request: FastifyRequest, reply: FastifyReply) {
  const {
    offset: offsetStr = '0',
    limit: limitStr = '10',
    orderBy = 'BALANCE_TOTAL_DESC',
  } = request.query as {
    offset: string
    limit: string
    orderBy: AccountOrderBy
  }

  const offset = parseInt(offsetStr)
  const limit = parseInt(limitStr)

  const { nodes, totalCount } = await fetchAccounts({ offset, limit, orderBy })

  const records = nodes.map((i, index) => {
    return {
      rank: offset + index + 1,
      address: i.address,
      updatedAt: i.updatedAt,
      balanceFree: i.balanceFree,
      balanceStaked: i.balanceStaked,
      balanceTotal: i.balanceTotal,
    }
  })

  reply.status(STANDARD.SUCCESS).send({
    data: { totalCount, records },
  })
}

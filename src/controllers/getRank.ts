import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'
import { fetchAccounts } from '../api/fetchAccounts'
import { AccountOrderBy } from '../models/pagination'
import { fetchRank } from '../api/fetchAccountRank'

export async function getAccountRank(request: FastifyRequest, reply: FastifyReply) {
  const { balance: balance = '0' } = request.query as {
    balance: string
  }
  const parsedBalance = parseInt(balance)
  const totalCount = await fetchRank(parsedBalance)

  reply.status(STANDARD.SUCCESS).send({
    data: { totalCount },
  })
}

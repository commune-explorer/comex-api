import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'
import { fetchTotalDeposited } from '../api/fetchExchangeDumps'

export async function getDeposits(request: FastifyRequest, reply: FastifyReply) {
  const { firstBlock, lastBlock, account } = request.query as {
    account: string
    firstBlock: number
    lastBlock: number
  }

  const deposits = await fetchTotalDeposited(account, firstBlock, lastBlock)
  let total_deposited = Object.fromEntries(deposits)
  reply.status(STANDARD.SUCCESS).send({
    data: { total_deposited },
  })
}

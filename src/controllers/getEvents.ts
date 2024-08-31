import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'
import { fetchExtrinsics } from '../api/fetchExtrinsics'
import { ExtrinsicOrderBy } from '../models/pagination'
import { fetchEvents } from '../api/fetchEvents'

export async function getEvents(request: FastifyRequest, reply: FastifyReply) {
  const {
    offset: offsetStr = '0',
    limit: limitStr = '10',
    blockNumber = '0',
    extrinsicId,
    orderBy = 'EXTRINSIC_ID_ASC',
  } = request.query as {
    offset: string
    limit: string
    orderBy: ExtrinsicOrderBy
    blockNumber: string
    extrinsicId?: number
  }

  const offset = parseInt(offsetStr)
  const limit = parseInt(limitStr)

  const { nodes, totalCount } = await fetchEvents({ orderBy, offset, limit, blockNumber, extrinsicId })

  const records = nodes.map((i, index) => {
    return {
      id: i.id,
      module: i.module,
      eventName: i.eventName,
      blockNumber: i.blockNumber,
      extrinsicId: i.extrinsicId,
      data: i.data,
    }
  })

  reply.status(STANDARD.SUCCESS).send({
    data: { totalCount, records },
  })
}

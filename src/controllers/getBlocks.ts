import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'
import { BlockOrderBy } from '../models/pagination'
import { fetchBlocks } from '../api/fetchBlocks'

export async function getBlocks(request: FastifyRequest, reply: FastifyReply) {
  const {
    offset: offsetStr = '0',
    limit: limitStr = '10',
    height,
    orderBy = 'HEIGHT_DESC',
  } = request.query as {
    offset: string
    limit: string
    orderBy: BlockOrderBy
    height?: string
  }

  const offset = parseInt(offsetStr)
  const limit = parseInt(limitStr)

  const { nodes, totalCount } = await fetchBlocks({ orderBy, offset, limit, height })

  const records = nodes.map((i, index) => {
    return {
      id: i.id,
      height: i.height,
      eventCount: i.eventCount,
      extrinsicCount: i.extrinsicCount,
      hash: i.hash,
      parentHash: i.parentHash,
      specVersion: i.specVersion,
      timestamp: i.timestamp,
    }
  })

  reply.status(STANDARD.SUCCESS).send({
    data: { totalCount, records },
  })
}

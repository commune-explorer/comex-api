import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'
import { fetchExtrinsics } from '../api/fetchExtrinsics'
import { ExtrinsicOrderBy } from '../models/pagination'

export async function getExtrinsics(request: FastifyRequest, reply: FastifyReply) {
  const {
    offset: offsetStr = '0',
    limit: limitStr = '10',
    blockNumber,
    orderBy = 'EXTRINSIC_ID_ASC',
    extrinsicId,
    id,
    signer,
  } = request.query as {
    offset: string
    limit: string
    orderBy: ExtrinsicOrderBy
    blockNumber?: string
    extrinsicId?: number
    id?: string
    signer?: string
  }

  const offset = parseInt(offsetStr)
  const limit = parseInt(limitStr)

  const { nodes, totalCount } = await fetchExtrinsics({ orderBy, offset, limit, blockNumber, extrinsicId, id, signer })

  const records = nodes.map((i, index) => {
    return {
      id: i.id,
      module: i.module,
      method: i.method,
      blockNumber: i.blockNumber,
      extrinsicId: i.extrinsicId,
      tip: i.tip,
      version: i.version,
      signer: i.signer,
      success: i.success,
      hash: i.hash,
      args: i.args,
    }
  })

  reply.status(STANDARD.SUCCESS).send({
    data: { totalCount, records },
  })
}

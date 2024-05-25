import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../../constants/code'
import { handleServerError } from '../../handlers/error'

export async function listGallery(request: FastifyRequest, reply: FastifyReply) {
  try {
    reply.status(STANDARD.SUCCESS).send({
      data: {
        rows: [],
      },
    })
  } catch (e) {
    handleServerError(reply, e)
  }
}

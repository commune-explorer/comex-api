import { FastifyReply } from 'fastify'
import { ERROR500 } from '../constants/code'

export function handleServerError(reply: FastifyReply, error: any) {
  console.error(error)
  return reply.status(ERROR500.statusCode).send(ERROR500)
}

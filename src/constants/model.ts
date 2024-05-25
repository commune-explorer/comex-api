import { FastifyRequest } from 'fastify'

export interface IUserRequest extends FastifyRequest {
  body: any
  user: any
}

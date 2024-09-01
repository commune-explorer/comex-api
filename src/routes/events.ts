import { FastifyInstance } from 'fastify'
import { getEvents } from '../controllers/getEvents'

export async function events(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: getEvents,
  })
}

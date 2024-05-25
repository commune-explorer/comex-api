import { FastifyInstance } from 'fastify'
import { listGallery } from '../controllers/home/listGallery'

export async function home(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/gallery',
    handler: listGallery,
  })
}

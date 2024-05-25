import Fastify from 'fastify'
import jwt from '@fastify/jwt'
import { home } from './routes/home'
;(BigInt.prototype as any).toJSON = function () {
  return this.toString()
}

const server = Fastify({
  logger: true,
})

server.register(jwt, {
  secret: 'k7T32aUhZbw3213QeTZsBs',
})

server.register(home)

server.setErrorHandler((error, request, reply) => {
  console.error(error)
})
server.get('/', (request, reply) => {
  reply.send({ name: 'hey' })
})

const start = async () => {
  await server.listen({ port: 4012, host: '0.0.0.0' })
}

start().catch(async (error) => {
  console.error(error)
  process.exit(1)
})

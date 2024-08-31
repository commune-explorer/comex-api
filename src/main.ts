import Fastify from 'fastify'
import jwt from '@fastify/jwt'
import { ERROR500 } from './constants/code'
import { home } from './routes/home'
import { subnet } from './routes/subnet'
import { account } from './routes/account'
import { block } from './routes/block'
import { extrinsic } from './routes/extrinsic'
import { events } from './routes/events'
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
server.register(subnet, { prefix: '/subnets' })
server.register(account, { prefix: '/accounts' })
server.register(block, { prefix: '/block' })
server.register(extrinsic, { prefix: '/extrinsic' })
server.register(events, { prefix: '/events' })

server.setErrorHandler((error, request, reply) => {
  console.error(`${request.url} error:`, error)
  return reply.status(ERROR500.statusCode).send(ERROR500)
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

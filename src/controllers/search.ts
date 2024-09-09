import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../constants/code'

const formattedNumber = (num: number) =>
  num < 10 ? `000${num}` : num < 100 ? `00${num}` : num < 1000 ? `0${num}` : `${num}`

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const { query } = request.query as {
    query: string
  }
  if (query.length === 48) {
    reply.status(STANDARD.SUCCESS).send({
      data: { url: `/account/${query}` },
    })
    return
  } else if (query.includes('-') && !isNaN(parseInt(query.split('-')[0])) && !isNaN(parseInt(query.split('-')[1]))) {
    const id = parseInt(query.split('-')[1])
    const extrinsicid = `${parseInt(query.split('-')[0])}-${formattedNumber(id)}`
    reply.status(STANDARD.SUCCESS).send({
      data: { url: `/extrinsic/${extrinsicid}` },
    })
    return
  } else if (!isNaN(parseInt(query))) {
    reply.status(STANDARD.SUCCESS).send({
      data: { url: `/block/${query}` },
    })
    return
  }

  reply.status(STANDARD.SUCCESS).send({
    data: { url: `/notfound/${query}` },
  })
}

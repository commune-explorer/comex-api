import { CACHE } from './cache'
;(BigInt.prototype as any).toJSON = function () {
  return this.toString()
}

const start = async () => {
  const caches = Object.values(CACHE)
  for (const cache of caches) {
    cache.startUpdater().catch(console.error)
  }
}

setInterval(() => {
  console.debug('Heartbeat...')
}, 60_000)

start().catch(async (error) => {
  console.error(error)
  process.exit(1)
})

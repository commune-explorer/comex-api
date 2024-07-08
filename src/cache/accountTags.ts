import { Cache } from './basic/base'
import { AccountTag } from '../models/accountTag'
import { CACHE } from './index'
import { RedisKey } from '../constants/common'

export class AccountTagCache extends Cache<AccountTag[]> {
  public intervalSeconds = 60 * 10
  public cacheKey: RedisKey = 'account_tags'

  public async fetch() {
    console.log('Start identifying account tags...')
    let cache: AccountTag[] = []

    const exchanges = await CACHE.exchangeAccounts.get()
    cache.push(...exchanges)

    const subnets = await CACHE.subnet.getSubnets()
    const snFounders: string[] = []
    for (const subnet of subnets) {
      cache.push({
        tag: {
          text: `${subnet.name} founder`,
          color: 'rgba(224,109,242,1)',
        },
        accounts: [subnet.registeredBy],
      })
      snFounders.push(subnet.registeredBy)
      const modules = await CACHE.subnet.getModules(subnet.id)
      for (const module of modules) {
        if (snFounders.includes(module.key)) {
          //Being founder is more important than being a module in a sn.
          continue
        }
        //TODO support multiple tags if active on more than one sn?
        cache.push({
          tag: {
            text: `sn${subnet.id}::${module.name}`,
            color: 'rgba(224,109,242,1)',
          },
          accounts: [module.key],
        })
      }
    }

    return cache
  }
}

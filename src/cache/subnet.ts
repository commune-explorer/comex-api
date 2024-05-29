import { Cache } from './base'
import { SubnetInfo, SubnetModule, SubnetParams } from '../models/subnet'
import { fetchSubnetModules, fetchSubnets } from '../api/comx'
import { fetchSubnetData } from '../api/fetchSubnetData'

export class SubnetCache extends Cache<SubnetInfo[]> {
  private subnets?: SubnetInfo[] = undefined
  private params: { [uid: number]: SubnetParams } = {}
  private modules: { [uid: number]: SubnetModule[] } = {}

  public async get() {
    if (!this.subnets) {
      await this.update()
    }
    return this.subnets ?? []
  }

  public async getSubnet(id: number) {
    if (!this.subnets) {
      await this.update()
    }
    return this.subnets?.find((i) => i.id === id)
  }

  public async getModules(id: number) {
    if (!this.subnets) {
      await this.update()
    }
    return this.modules[id] ?? []
  }

  public async getParams(id: number) {
    if (!this.subnets) {
      await this.update()
    }
    return this.params[id]
  }

  public async update() {
    console.log('start update subnets')
    const subnets = (await fetchSubnets()).filter((i) => i.emission > 0).sort((a, b) => a.netuid - b.netuid)
    const { params, subnets: metaSubnets, burns } = await fetchSubnetData()

    let paramsMap: { [uid: number]: SubnetParams } = {}
    let modules: { [uid: number]: SubnetModule[] } = {}

    for (const subnet of subnets) {
      const netuid = subnet.netuid
      // params
      const subnetParams = params.find((i) => i.netUid === netuid)
      if (subnetParams) {
        paramsMap[netuid] = subnetParams
      }

      // modules
      console.log('start fetch subnet modules:', netuid)
      const subnetModules = await fetchSubnetModules(netuid)
      modules[netuid] = subnetModules.map((i) => {
        return {
          uid: i.uid,
          key: i.key,
          emission: i.emission,
          incentive: i.incentive,
          dividends: i.dividends,
          delegationFee: i.delegation_fee,
          stake: i.stake,
          address: i.address,
          inImmunity: i.in_immunity,
          active: i.type !== 'inactive',
          isValidator: i.type === 'validator',
        }
      })
    }
    this.params = paramsMap
    this.modules = modules

    this.subnets = subnets.map((i) => {
      const modules = this.modules[i.netuid]
      const meta = metaSubnets.find((j) => j.netUid === i.netuid)
      const burn = burns.find((j) => j.netUid === i.netuid)
      return {
        id: i.netuid,
        name: i.name,
        activeKeys: modules.filter((i) => i.active).length,
        totalKeys: modules.length,
        activeValidators: modules.filter((i) => i.active && i.isValidator).length,
        totalValidators: modules.filter((i) => i.isValidator).length,
        activeMiners: modules.filter((i) => i.active && !i.isValidator).length,
        totalMiners: modules.filter((i) => !i.isValidator).length,
        registerCost: parseFloat((parseFloat(burn?.burn ?? '0') / 1_000_000_000).toFixed(2)),
        registeredAt: meta?.registeredAt ?? 0,
        registeredBy: i.founder,
        emissionPercentage: 0,
        githubUrl: '',
      }
    })
  }
}

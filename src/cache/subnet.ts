import { Cache } from './base'
import { fetchSubnetParams } from '../graphql/fetchSubnetParams'
import { SubnetInfo, SubnetModule, SubnetParams } from '../models/subnet'
import { fetchModules } from '../graphql/fetchModules'

export class SubnetCache extends Cache<SubnetInfo[]> {
  private subnets?: SubnetInfo[] = undefined
  private modules: { [uid: string]: SubnetModule[] } = {}
  private params: { [uid: string]: SubnetParams } = {}

  public async get() {
    if (!this.subnets) {
      await this.update()
    }
    return this.subnets ?? []
  }

  public async getSubnet(id: string) {
    if (!this.subnets) {
      await this.update()
    }
    return this.subnets?.find((i) => i.id.toString() === id)
  }

  public async getModules(id: string) {
    if (!this.subnets) {
      await this.update()
    }
    return this.modules[id] ?? []
  }

  public async getParams(id: string) {
    if (!this.subnets) {
      await this.update()
    }
    return this.params[id]
  }

  public async update() {
    const params = await fetchSubnetParams()
    const moduleList = await fetchModules()

    let modules: { [uid: string]: SubnetModule[] } = {}
    for (const module of moduleList) {
      const netuid = module.netUid.toString()
      if (!modules[netuid]) {
        modules[netuid] = []
      }
      modules[netuid].push({
        uid: module.uid,
        key: module.key,
        emission: 0,
        incentive: 0,
        dividends: 0,
        delegationFee: 0,
        stake: 0,
        address: '',
        active: false,
        inImmunity: false,
      })
    }
    this.modules = modules

    let paramsMap: { [uid: string]: SubnetParams } = {}
    for (const param of params) {
      const netuid = param.netUid.toString()
      paramsMap[netuid] = param
    }
    this.params = paramsMap

    this.subnets = params.map((i) => {
      return {
        id: i.netUid,
        name: i.name,
        activeKeys: 0,
        totalKeys: 0,
        activeValidators: 0,
        totalValidators: 0,
        activeMiners: 0,
        totalMiners: 0,
        registerCost: 0,
        githubUrl: '',
        registeredAt: 0,
        registeredBy: '',
        emissionPercentage: 0,
      }
    })
  }
}

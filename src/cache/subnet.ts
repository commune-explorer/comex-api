import { Cache } from './basic/base'
import { SubnetInfo, SubnetModule, SubnetParams } from '../models/subnet'
import { fetchSubnetModules, fetchSubnets } from '../api/comx'
import { fetchSubnetData } from '../api/fetchSubnetData'
import { SUBNET_REPO } from '../constants/subnet'
import { RedisKey } from '../constants/common'

interface SubnetData {
  subnets: SubnetInfo[]
  params: SubnetParams[]
  modules: SubnetModule[]
}

export class SubnetCache extends Cache<SubnetData> {
  public intervalSeconds = 0
  public cacheKey: RedisKey = 'subnets'

  public async getSubnets() {
    return (await this.get()).subnets
  }

  public async getSubnet(id: number) {
    return (await this.get()).subnets.find((i) => i.id === id)
  }

  public async getModules(id: number) {
    return (await this.get()).modules.filter((i) => i.netuid === id)
  }

  public async getParams(id: number) {
    return (await this.get()).params.find((i) => i.netuid === id)
  }

  public async fetch() {
    console.log('start fetch subnets...')
    const subnets = (await fetchSubnets()).filter((i) => i.emission > 0).sort((a, b) => a.netuid - b.netuid)
    console.log(`subnets: ${JSON.stringify(subnets.map((i) => [i.netuid, i.name]))}`)

    const { params, subnets: metaSubnets, burns } = await fetchSubnetData()

    let paramsMap: { [uid: number]: SubnetParams } = {}
    let modulesMap: { [uid: number]: SubnetModule[] } = {}

    for (const subnet of subnets) {
      const netuid = subnet.netuid
      // params
      const subnetParams = params.find((i) => i.netUid === netuid)
      if (subnetParams) {
        paramsMap[netuid] = {
          netuid: netuid,
          founder: subnetParams.founder,
          tempo: subnetParams.tempo,
          founderShare: subnetParams.founderShare,
          immunityPeriod: subnetParams.immunityPeriod,
          incentiveRatio: subnetParams.incentiveRatio,
          lastUpdate: subnetParams.lastUpdate,
          maxAllowedUids: subnetParams.maxAllowedUids,
          maxAllowedWeights: subnetParams.maxAllowedWeights,
          maxStake: subnetParams.maxStake,
          maxWeightAge: subnetParams.maxWeightAge,
          minAllowedWeights: subnetParams.minAllowedWeights,
          minStake: subnetParams.minStake,
          voteMode: subnetParams.voteMode,
        }
      }

      // modules
      console.log('start fetch subnet modules:', netuid)
      const subnetModules = await fetchSubnetModules(netuid)
      modulesMap[netuid] = subnetModules.map((i) => {
        return {
          uid: i.uid,
          name: i.name,
          netuid: netuid,
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

    const totalEmission = subnets.reduce((acc, i) => acc + i.emission, 0)

    return {
      params: Object.values(paramsMap),
      modules: Object.values(modulesMap).flat(),
      subnets: subnets.map((i) => {
        const modules = modulesMap[i.netuid]
        const meta = metaSubnets.find((j) => j.netUid === i.netuid)
        const burn = burns.find((j) => j.netUid === i.netuid)
        const emissionPercentage = (i.emission * 100) / totalEmission
        const result: SubnetInfo = {
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
          emissionPercentage,
          githubUrl: SUBNET_REPO[i.netuid] ?? 'https://github.com/',
        }
        return result
      }),
    }
  }
}

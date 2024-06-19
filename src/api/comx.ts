import { ApiSubnet, ApiSubnetModule } from '../models/api'
import axios from 'axios'
import { IS_PRODUCTION } from '../constants/common'

const options = {
  baseURL: IS_PRODUCTION ? 'http://communex-api:7860/' : 'https://comex.mosaicx.org/comx-api/',
  timeout: 60_000,
}

export async function fetchSubnets() {
  const {
    data: { subnets },
  } = await axios.get<{ subnets: ApiSubnet[] }>(`/subnets`, options)
  console.info('fetchSubnets:', subnets.length)
  return subnets
}

export async function fetchSubnetModules(netuid: number) {
  const {
    data: { modules },
  } = await axios.get<{ modules: ApiSubnetModule[] }>(`/subnets/${netuid}/modules`, options)
  console.info('fetchSubnets:', netuid, modules.length)
  return modules
}

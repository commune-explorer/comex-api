import { ApiSubnet, ApiSubnetModule } from '../models/api'
import axios from 'axios'
import { IS_PRODUCTION } from '../constants/common'

export async function fetchSubnets() {
  const {
    data: { subnets },
  } = await axios.get<{ subnets: ApiSubnet[] }>(`/subnets`, {
    baseURL: IS_PRODUCTION ? 'http://communex-api:7860/' : 'https://comex.mosaicx.org/comx-api/',
    timeout: 60_000,
  })
  return subnets
}

export async function fetchSubnetModules(netuid: number) {
  const {
    data: { modules },
  } = await axios.get<{ modules: ApiSubnetModule[] }>(`/subnets/${netuid}/modules`, {
    baseURL: IS_PRODUCTION ? 'http://communex-api/' : 'https://comex.mosaicx.org/comx-api/',
    timeout: 60_000,
  })
  return modules
}

import { ApiSubnetModule } from '../models/api'
import axios from 'axios'
import { IS_PRODUCTION } from '../constants/common'

interface Response {
  modules: ApiSubnetModule[]
}

export async function fetchSubnetModules(netuid: number) {
  const {
    data: { modules },
  } = await axios.get<Response>(`/subnets/${netuid}/modules`, {
    baseURL: IS_PRODUCTION ? 'http://communex-api/' : 'https://comex.mosaicx.org/comx-api/',
    timeout: 60_000,
  })
  return modules
}

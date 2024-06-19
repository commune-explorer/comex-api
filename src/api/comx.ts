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


export async function fetchDailyEmission() {
  try {
    console.info('Fetching daily emission from:', options.baseURL);
    const {
      data: { daily_emission },
    } = await axios.get<{ daily_emission: number }>('/daily-emission', options);
    console.info('fetchDailyEmission:', daily_emission);
    return daily_emission;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error message:', error.message);
      console.error('Axios error response:', error.response?.status, error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}

export async function fetchValidatingApr() {
  try {
    console.info('Fetching validating APR from:', options.baseURL);
    const { data } = await axios.get('/apr', options);
    console.info('fetchValidatingApr:', data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error message:', error.message);
      console.error('Axios error response:', error.response?.status, error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}
import Axios from 'axios'
import jysdk from '../../index'
import qs from 'query-string'
const axios = Axios.create()

export async function savelog (data) {
  return axios({
    url: (await jysdk.platformApi.jy_data.getHostAsync('bsop_host')) + '/jy-mp-log/mtc/savelog',
    method: 'post',
    data: qs.stringify(data),
    headers: {
      Authorization: 'Bearer ' + await jysdk.nativeApi.jy_storage.getItemAsync("accessToken"),
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}

export async function traceLog (data) {
  return axios({
    url: (await jysdk.platformApi.jy_data.getHostAsync('trace_log')) + '/jy-jymt-statistic-base/trace/report',
    method: 'post',
    data,
    headers: {
      Authorization: 'Bearer ' + await jysdk.nativeApi.jy_storage.getItemAsync("accessToken")
    }
  })
}
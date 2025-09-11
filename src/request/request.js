import Axios from 'axios'
import jysdk from '../index'
import {
  netInterface,
  storeKey,
  JYMT_ACLOUD_WB_PREFIX
} from '../constant/constant.js'
const axios = Axios.create()

export async function interfaceMapping (code) {
  let availableNetworkAddresses = window.mock ? '/newOne_cloud'  : await jysdk.nativeApi.jy_storage.getItemAsync('availableNetworkAddresses')
  let AppInfoRepo = await jysdk.nativeApi.jy_storage.getItemAsync('$APP_INFO_REPO$')
  console.log('AppInfoRepo', AppInfoRepo)
  return axios({
    url: availableNetworkAddresses + JYMT_ACLOUD_WB_PREFIX + netInterface.interfaceMapping + AppInfoRepo['APPKEY'],
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + await jysdk.nativeApi.jy_storage.getItemAsync(storeKey.accessToken)
    },
    params: {
      areaCode: code,
      areaCodeType: 'mineCode'
    }
  })
}

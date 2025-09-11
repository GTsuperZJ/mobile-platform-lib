import jysdk from '../../index.js'
import {
  getLocalStorage
} from '../../utils/localStorage_utils'
import {
  interfaceMapping
} from '../../request/request.js'
let hostConfig = '$hostConfig$'

export const jy_data = {
  /**
   * 存储ip映射地址
   * @param {*} data
   */
  async setHost (data) {
    let availableNetworkAddresses = await jysdk.nativeApi.jy_storage.getItemAsync('availableNetworkAddresses')
    const currList = data[availableNetworkAddresses] || []
    const obj = {}
    currList.forEach(item => {
      obj[item.hostNameEn] = item.hostAddress
    })
    jysdk.nativeApi.jy_storage.setItem('$hostConfig$', obj)
  },
  /**
   * 获取对应ip映射地址
   * @param {*} key
   * @returns
   */
  async getHostAsync (key) {
    return new Promise((resolve, reject) => {
      let res = ''
      if (process.env.NODE_ENV == 'production') {
        window.top.NativeStorage.getItem(hostConfig, success => {
          res = success[key]
          resolve(res)
        }, error => {
          reject(error)
        })
      } else {
        if (jysdk.store.state[hostConfig] !== undefined && jysdk.store.state[hostConfig] !== null) {
          let success = jysdk.store.state[hostConfig]
          res = success[hostConfig]
        } else {
          let success = getLocalStorage(hostConfig)
          res = success && success[key]
        }
        console.log(res)
        resolve('')
      }
    })

  },
  /**
   * 存储modules
   * @param {*} data
   */
  setModules (data) {
    let modules = []
    let bottomInfo = data.bottomInfo
    if (bottomInfo.length > 0) {
      bottomInfo.forEach(bottomInfoItem => {
        if (bottomInfoItem.groupInfoList && bottomInfoItem.groupInfoList.length > 0) {
          let groupInfoList = bottomInfoItem.groupInfoList
          if (groupInfoList.length > 0) {
            groupInfoList.forEach(groupInfoItem => {
              if (groupInfoItem.moduleList && groupInfoItem.moduleList.length > 0) {
                modules.push(...groupInfoItem.moduleList)
              }
            })
          }
        }
      })
    }
    jysdk.nativeApi.jy_storage.setItem('$modulesConfig$', modules)
  },
  /**
   * 是否拥有该模块
   * @param {*} moduleKey
   */
  async hasModuleAsync (moduleKey) {
    let modules = await jysdk.nativeApi.jy_storage.getItemAsync('$modulesConfig$') || []
    console.log(modules)
    return modules.map(i => i.flagName).includes(moduleKey)
  },
  /**
   * 机构组织方式
   * @returns
   */
  async getOrgPolicyAsync () {
    let appInfoRepo = await jysdk.nativeApi.jy_storage.getItemAsync('$APP_INFO_REPO$')
    return appInfoRepo.config.orgPolicy
  },
  setConfig (data) {
    const params = {}
    for (const i in data) {
      params[i] = data[i]
    }
    jysdk.nativeApi.jy_storage.setItem('$params$', params)
  },
  async isLawEnabled () {
    let params = await jysdk.nativeApi.jy_storage.getItemAsync('$params$')
    return params['LAW'] === '00'
  },
  async isEcCommunicationEnabled () {
    let params = await jysdk.nativeApi.jy_storage.getItemAsync('$params$')
    return params['EC_COMMUNICATION'] === '00'
  },
  async getHostByCode (code, hostNameEn) {
    return new Promise(async (resolve, reject) => {
      interfaceMapping(code).then(async res => {
        let resData = res.data
        let data = resData.data
        let availableNetworkAddresses = await jysdk.nativeApi.jy_storage.getItemAsync('availableNetworkAddresses')
        if (resData.code == 0 && availableNetworkAddresses in data) {
          let list = data[availableNetworkAddresses]
          // 匹配
          const matches = list.filter(item => item.hostNameEn === hostNameEn);
          resolve(matches[0].hostAddress)
        } else {
          reject("")
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}
export const apiInstaller = () => {
  return {
    name: 'jy_data',
    api: jy_data,
  }
}

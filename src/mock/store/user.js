import {
  token,
  userInfo,
  copUserInfo,
  org,
  orgSimpleTree,
  network,
  baseInfoByAppKey,
  configInfoByAppKey,
  confInfo
} from '../../platform-api/login/request'
import {
  jy_data
} from '../../platform-api/data/data'
import jysdk from '../../index'


export default {
  namespaced: true,
  state: {
    accessToken: '',
    refreshToken: '',
    mineCode: '',
    mineName: '',
    userInfo: '',
    network: ''
  },
  mutations: {
    SET_ACCESS_TOKEN (state, accessToken) {
      state.accessToken = accessToken
    },
    SET_REFRESH_TOKEN (state, refreshToken) {
      state.refreshToken = refreshToken
    },
    SET_MINE_CODE (state, mineCode) {
      state.mineCode = mineCode
    },
    SET_MINE_NAME (state, mineName) {
      state.mineName = mineName
    },
    SET_USER_INFO (state, userInfo) {
      state.userInfo = userInfo
    },
    SET_NETWORK (state, network) {
      state.network = network
    },
    SET_BASE_INFO (state, baseInfo) {
      state.baseInfo = baseInfo
    }
  },
  actions: {
    fetchToken ({ commit }, u_p) {
      return new Promise((resolve, reject) => {
        token(u_p.username, u_p.password).then(res => {
          let accessToken = res.data.access_token
          let refreshToken = res.data.refresh_token
          let mineCode = res.data.org_code
          let mineName = res.data.org_name
          jysdk.store.state.accessToken = accessToken
          jysdk.nativeApi.jy_storage.setItem('accessToken', accessToken)
          jysdk.store.state.refreshToken = refreshToken
          jysdk.nativeApi.jy_storage.setItem('refreshToken', refreshToken)
          jysdk.store.state.mineCode = mineCode
          jysdk.nativeApi.jy_storage.setItem('mineCode', mineCode)
          jysdk.store.state.mineName = mineName
          jysdk.nativeApi.jy_storage.setItem('mineName', mineName)
          // this.$set(jysdk.store.state, 'accessToken', accessToken)
          // this.$set(jysdk.store.state, 'refreshToken', refreshToken)
          // this.$set(jysdk.store.state, 'mineCode', mineCode)
          // this.$set(jysdk.store.state, 'mineName', mineName)
          // commit('SET_ACCESS_TOKEN', accessToken)
          // commit('SET_REFRESH_TOKEN', refreshToken)
          // commit('SET_MINE_CODE', mineCode)
          // commit('SET_MINE_NAME', mineName)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })

      })
    },
    fetchUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        userInfo().then(res => {
          let userInfo = res.data.data
          jysdk.store.state.userInfo = userInfo
          jysdk.nativeApi.jy_storage.setItem('userInfo', userInfo)
          // commit('SET_USER_INFO', userInfo)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })

      })
    },
    fetchCopUserInfo ({ commit }) {
      return new Promise(async (resolve, reject) => {
        copUserInfo().then(res => {
          let userInfo = res.data.data
          jysdk.store.state.userInfo = userInfo
          jysdk.nativeApi.jy_storage.setItem('userInfo', userInfo)
          // commit('SET_USER_INFO', userInfo)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    fetchOrg ({ commit }) {
      return new Promise(async (resolve, reject) => {
        let userInfo = await jysdk.nativeApi.jy_storage.getItemAsync("userInfo")
        let orgId = userInfo.userDTO.orgId
        org(orgId).then(res => {
          let orgInfo = res.data.data
          jysdk.store.state.orgInfo = orgInfo
          jysdk.nativeApi.jy_storage.setItem('orgInfo', orgInfo)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    fetchOrgSimpleTree ({ commit }) {
      return new Promise(async (resolve, reject) => {
        let userInfo = await jysdk.nativeApi.jy_storage.getItemAsync("userInfo")
        let orgId = userInfo.userDTO.orgId
        orgSimpleTree(orgId).then(res => {
          let orgInfo = res.data.data
          jysdk.nativeApi.jy_storage.setItem('simpleOrg', orgInfo)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    fetchNetwork ({ commit }, appId) {
      return new Promise((resolve, reject) => {
        // let availableNetworkAddresses = await jysdk.nativeApi.jy_storage.getItemAsync('availableNetworkAddresses')
        network(appId).then(res => {
          let data = res.data.data
          jy_data.setHost(data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    fetchBaseInfo ({ commit }, orgTrees) {
      return new Promise(async (resolve, reject) => {
        let APPKEY = (await jysdk.nativeApi.jy_storage.getItemAsync('$APP_INFO_REPO$')).APPKEY
        baseInfoByAppKey(APPKEY, orgTrees).then(res => {
          let data = res.data.data
          jy_data.setModules(data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    fetchConfigInfo ({ commit }) {
      return new Promise(async (resolve, reject) => {
        let APPKEY = (await jysdk.nativeApi.jy_storage.getItemAsync('$APP_INFO_REPO$')).APPKEY
        configInfoByAppKey(APPKEY).then(res => {
          let data = res.data.data
          jy_data.setConfig(data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    fetchConfInfo ({ commit }) {
      return new Promise(async (resolve, reject) => {
        let userInfo = await jysdk.nativeApi.jy_storage.getItemAsync("userInfo")
        let realname = userInfo.userDTO.realname
        let phone = userInfo.userDTO.phone
        confInfo(realname, phone).then(res => {
          let data = res.data.data
          jysdk.nativeApi.jy_storage.setItem('confInfo', data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
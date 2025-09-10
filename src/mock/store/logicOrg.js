/* eslint-disable prefer-promise-reject-errors */
import jysdk from '../../index'
import {
  logicSimpleTree
} from '../../platform-api/login/request'
class LogicOrgConfig {
  constructor(logicOrgTreeCode = '') {
    this.orgTree = []
    this.logicOrgRootId = ''
    this.logicOrgCode = ''
    this.sysRegionId = ''
    this.logicOrgTreeCode = logicOrgTreeCode
    this.flattedOrgTree = {} // key logicOrgId
    this.flattedOrgTreeByCode = {} // key logicOrgId
    this.flattedOrgMine = {}
    this.flattedMineCode = {}
    this.flatedOrgAll = {}
  }

  setOrgTree (orgTree = []) {
    this.orgTree = orgTree
    this.setupFlatOrgTree(this.orgTree)
    return this
  }

  setupFlatOrgTree (orgTree = []) {
    orgTree.forEach(org => {
      const { children } = org
      if (children && children.length > 0) {
        this.flattedOrgTree[org.id] = org
        this.setupFlatOrgTree(children)
      } else {
        this.flattedOrgMine[org.id] = org
        this.flattedMineCode[org.code] = org
      }
      this.flatedOrgAll[org.id] = org
      this.flattedOrgTreeByCode[org.code] = org
    })
  }

  setLogicOrgRootId (logicOrgRootId) {
    this.logicOrgRootId = logicOrgRootId
    return this
  }

  setLogicOrgCode (logicOrgCode) {
    this.logicOrgCode = logicOrgCode
    return this
  }

  setLogicOrgTreeCode (logicOrgTreeCode) {
    this.logicOrgTreeCode = logicOrgTreeCode
    return this
  }

  setSysRegionId (sysRegionId) {
    this.sysRegionId = sysRegionId
    return this
  }
}
export default {
  namespaced: true,
  state: {
    orgConfig: new LogicOrgConfig(),
    currentOrgId: '',
    currentOrgParentId: '',
    currentOrgName: '',
    currentOrgLength: 0,
    currentOrgNames: [],
    currentOrgs: [],
    currentUserList: [],
    mineType: 'L050'
  },
  mutations: {
    SET_LOGIC_ORG_CONFIG (state, config = new LogicOrgConfig()) {
      state.orgConfig = config
    },
  },
  actions: {
    fetchLogicOrgTree ({ commit }) {
      return new Promise(async (resolve, reject) => {
        let userInfo = await jysdk.nativeApi.jy_storage.getItemAsync("userInfo")
        const result = new LogicOrgConfig(userInfo.logicCodes[0])
        logicSimpleTree(userInfo.logicCodes[0], userInfo.userDTO.orgId).then(res => {
          const { data, code, msg } = res.data
          if (code === 0) {
            if (data) {
              result.setLogicOrgRootId(data.id)
              result.setLogicOrgCode(data.code)
              result.setSysRegionId(data.sysRegionId)
              result.setOrgTree([data])
              commit('SET_LOGIC_ORG_CONFIG', result)
              let orgConfig = {
                orgConfig: result
              }
              jysdk.nativeApi.jy_storage.setItem('logicOrg', orgConfig)
              resolve({ logicOrgTreeCode: userInfo.logicCodes[0], logicOrgRootId: data.id })
            } else {
              reject('获取逻辑机构信息失败1')
            }
          } else {
            reject(msg || '获取逻辑机构树失败2')
          }
        }).catch(err => {
          console.error(err)
          reject('获取逻辑机构树失败3')
        })
      })

    }
  }
}

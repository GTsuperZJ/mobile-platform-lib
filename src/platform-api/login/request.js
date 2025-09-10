import Axios from 'axios'
import jysdk from '../../index'
const axios = Axios.create()

const JAVA_PLATFORM_PREFIX = ''
const JAVA_JYMT_PREFIX = '/jy-jymt-acloud-admin'
let baseUrl = ''

export function setHost (host) {
  baseUrl = host
}

export function token (username, password) {
  return axios({
    url: baseUrl + JAVA_PLATFORM_PREFIX + '/auth/oauth/token',
    method: 'post',
    params: {
      username: username,
      password: password,
      grant_type: 'password'
    },
    headers: {
      Authorization: 'Basic YXBwOmFwcA=='
    }
  })
}

export async function sysInfoJykj () {
  return axios({
    url: baseUrl + JAVA_PLATFORM_PREFIX + '/admin/sysInfo/jykj',
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + await jysdk.nativeApi.jy_storage.getItemAsync("accessToken")
    }
  })
}

export async function userInfo () {
  return axios({
    url: baseUrl + JAVA_PLATFORM_PREFIX + '/admin/user/info',
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + await jysdk.nativeApi.jy_storage.getItemAsync("accessToken")
    }
  })
}

export async function copUserInfo () {
  return axios({
    url: baseUrl + JAVA_PLATFORM_PREFIX + '/cop-admin/user/info',
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + await jysdk.nativeApi.jy_storage.getItemAsync("accessToken")
    }
  })
}

export async function logicSimpleTree (logicTreeCode, orgId) {
  return axios({
    url: baseUrl + JAVA_PLATFORM_PREFIX + '/admin/orgLogic/getLogicSimpleTree',
    method: 'get',
    params: {
      logicTreeCode: logicTreeCode,
      orgId: orgId
    },
    headers: {
      Authorization: 'Bearer ' + await jysdk.nativeApi.jy_storage.getItemAsync("accessToken")
    }
  })
}

export async function org (orgId) {
  return axios({
    url: baseUrl + JAVA_PLATFORM_PREFIX + '/admin/org/' + orgId,
    method: 'get',
    params: {
      regionYes: 1
    },
    headers: {
      Authorization: 'Bearer ' + await jysdk.nativeApi.jy_storage.getItemAsync("accessToken")
    }
  })
}

export async function orgSimpleTree (orgId) {
  return axios({
    url: baseUrl + JAVA_PLATFORM_PREFIX + '/admin/org/simpleTree',
    method: 'get',
    params: {
      root: orgId
    },
    headers: {
      Authorization: 'Bearer ' + await jysdk.nativeApi.jy_storage.getItemAsync("accessToken")
    }
  })
}

export async function network (appId) {
  return axios({
    url: baseUrl + '/jy-jymt-acloud-web/api/v1/acloud-web/interface-mapping/query/by-appKey/for-network/' + appId,
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + await jysdk.nativeApi.jy_storage.getItemAsync("accessToken")
    }
  })
}

export async function listByDeptId (deptId) {
  return axios({
    url: baseUrl + '/admin/orgLogic/getListByDeptId',
    method: 'get',
    params: {
      deptId: deptId
    },
    headers: {
      Authorization: 'Bearer ' + await jysdk.nativeApi.jy_storage.getItemAsync("accessToken")
    }
  })
}

export async function baseInfoByAppKey (appKey, orgTrees) {
  return axios({
    url: baseUrl + '/jy-jymt-acloud-web/api/v1/acloud-web/app/base-info/query/init/by-appKey/' + appKey,
    method: 'get',
    params: {
      orgTrees: orgTrees
    },
    headers: {
      Authorization: 'Bearer ' + await jysdk.nativeApi.jy_storage.getItemAsync("accessToken")
    }
  })
}

export async function configInfoByAppKey (appKey) {
  return axios({
    url: baseUrl + '/jy-jymt-acloud-web/api/v1/acloud-web/app-config/config-info/query/by-appKey/' + appKey,
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + await jysdk.nativeApi.jy_storage.getItemAsync("accessToken")
    }
  })
}

export async function confInfo (realname, phone) {
  return axios({
    url: baseUrl + '/conf/user/register',
    method: 'post',
    data: {
      name: realname,
      phone: phone
    },
    headers: {
      Authorization: 'Bearer ' + await jysdk.nativeApi.jy_storage.getItemAsync("accessToken")
    }
  })
}
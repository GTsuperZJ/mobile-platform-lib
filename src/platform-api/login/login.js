
import store from "../../mock/store"
import {
	setHost,
	sysInfoJykj,
	listByDeptId,
} from './request'

export const loginFunc = {
	setHost (host) {
		setHost(host)
	},
	getToken: ({ username, password }, success, error) => {
		store.dispatch('user/fetchToken', {
			username: username,
			password: password
		}).then(res => {
			success(res)
		}).catch(err => {
			error(err)
		})
	},
	getSysInfoJykj: (success, error) => {
		sysInfoJykj().then(res => {
			success(res)
		}).catch(err => {
			error(err)
		})
	},
	getUserInfo: (success, error) => {
		store.dispatch('user/fetchUserInfo').then(res => {
			success(res)
		}).catch(err => {
			error(err)
		})
	},
	getCopUserInfo: (success, error) => {
		store.dispatch('user/fetchCopUserInfo').then(res => {
			success(res)
		}).catch(err => {
			error(err)
		})
	},
	getLogicOrgTree: (success, error) => {
		store.dispatch('logicOrg/fetchLogicOrgTree').then(res => {
			success(res)
		}).catch(err => {
			error(err)
		})
	},
	getOrg: (success, error) => {
		store.dispatch('user/fetchOrg').then(res => {
			success(res)
		}).catch(err => {
			error(err)
		})
	},
	getOrgSimpleTree: (success, error) => {
		store.dispatch('user/fetchOrgSimpleTree').then(res => {
			success(res)
		}).catch(err => {
			error(err)
		})
	},
	getNetwork: (appId, success, error) => {
		store.dispatch('user/fetchNetwork', appId).then(res => {
			success(res)
		}).catch(err => {
			error(err)
		})
	},
	listByDeptId: (deptId, success, error) => {
		listByDeptId(deptId).then(res => {
			success(res)
		}).catch(err => {
			error(err)
		})
	},
	baseInfoByAppKey: (orgTrees, success, error) => {
		store.dispatch('user/fetchBaseInfo', orgTrees).then(res => {
			success(res)
		}).catch(err => {
			error(err)
		})
	},
	configInfoByAppKey: (success, error) => {
		store.dispatch('user/fetchConfigInfo').then(res => {
			success(res)
		}).catch(err => {
			error(err)
		})
	},
	confInfo: (success, error) => {
		store.dispatch('user/fetchConfInfo').then(res => {
			success(res)
		}).catch(err => {
			error(err)
		})
	}
}

export const apiInstaller = () => {
	return {
		name: 'login',
		api: loginFunc,
	}
}

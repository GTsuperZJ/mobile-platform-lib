import { setupCordova, setupJSBridge, ready, isReady } from './setup/cordova'
import { instance as platform } from './platform-api'
import { instance as native } from './native-api'
import store from './mock/store'

let state = { ready, isReady }

/**
 * 原生相关的api
 * @ignore
 */
let nativeApi = {}

/**
 * 平台相关的api
 * @ignore
 */
let platformApi = {}

const init = (appId) => {
	window.appId = appId
	setupCordova()
	setupJSBridge()
	Object.assign(platformApi, platform())
	Object.assign(nativeApi, native())
	window.mock = process.env.NODE_ENV !== 'production'
}

/**
 * 开放给业务系统的接口，最终的导出对象
 * @ignore
 */
const jysdk = {
	init,
	state,
	nativeApi,
	platformApi,
	store
}

export default jysdk

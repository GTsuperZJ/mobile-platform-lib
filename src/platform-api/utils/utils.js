import jysdk from '../../index.js'

export const jy_utils = {
    async checkTv() {
        let getCurrentModeType = () => {
            return new Promise((resolve, reject) => {
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.UIModeManager) {
                    window.cordova.plugins.UIModeManager.getCurrentModeType(
                        success => {
                            resolve(success)
                            console.log('getCurrentModeType success', success)
                        },
                        error => {
                            reject(error)
                            console.error('getCurrentModeType error', error)
                        }
                    )
                } else {
                    reject('cordova.plugins.UIModeManager not found')
                }
            })
        }

        let getDeviceInfoFingerprint = () => {
            return new Promise((resolve, reject) => {
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.DeviceInfo) {
                    window.cordova.plugins.DeviceInfo.getDeviceFingerprint(
                        success => {
                            resolve(success)
                            console.log('getDeviceFingerprint success', success)
                        },
                        error => {
                            reject(error)
                            console.error('getDeviceFingerprint error', error)
                        }
                    )
                } else {
                    reject('cordova.plugins.DeviceInfo not found')
                }
            })
        }

        let currentType = await getCurrentModeType()
        let deviceInfoFingerprint = await getDeviceInfoFingerprint() // 'HUAWEI/xxxxx/xxdddyd:12/xxxxx'
        if (currentType === 'UI_MODE_TYPE_TELEVISION') {
            return true
        } else {
            let dynamicConfig = await jysdk.nativeApi.jy_storage.getItemAsync('$dynamicConfig$')
            let tvConfig = dynamicConfig.tvConfig || '' // tv配置字符串：'HIKVISION/rk3588_hikmeet/rk3588_hikmeet:12', 'HUAWEI/xxxxx/xxdddyd:12'
            if (tvConfig !== '') {
                let tvConfigArray = tvConfig.split('/') // ['HIKVISION/rk3588_hikmeet/rk3588_hikmeet:12', 'HUAWEI/xxxxx/xxdddyd:12']
                if (tvConfigArray.length > 0) {
                    return tvConfigArray.some(item => deviceInfoFingerprint.includes(item))
                }
            }
            return false
        }
    },
    async isMicroApp(callback) {
        if (window.mock) {
            console.log('mock')
            callback(false)
        } else {
            window.top.JSBridge.invoke({
                funcName: 'isMicroApp',
                success: success => {
                    callback(success)
                }
            })
        }
    }
}

export const apiInstaller = () => {
    return {
        name: 'jy_utils',
        api: jy_utils,
    }
}

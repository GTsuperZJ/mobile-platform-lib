import {
    setLocalStorage,
    getLocalStorage
} from '../../utils/localStorage_utils'
import jysdk from '../../index.js'

const setKey = function (k) {
    return `${window.appId ? window.appId + '$' : ''}${k}`
}

export const jy_storage = {
    setItem (key, value) {
        if (process.env.NODE_ENV == 'production') {
            window.top.NativeStorage.setItem(key, value)
        } else {
            setLocalStorage(key, value)
            // window.top.localStorage.setItem(key, value)
            // jysdk.store.state[key] = value
        }
    },
    getItem (key, successBack, errorBack) {
        if (process.env.NODE_ENV == 'production') {
            window.top.NativeStorage.getItem(key, success => {
                successBack(success)
            }, error => {
                errorBack(error)
            })
        } else {
            if (jysdk.store.state[key] !== undefined && jysdk.store.state[key] !== null) {
                successBack(jysdk.store.state[key])
            } else {
                successBack(getLocalStorage(key))
            }
            // successBack(window.top.localStorage.getItem(key))
        }
    },
    async getItemAsync (key) {
        return new Promise((resolve, reject) => {
            if (process.env.NODE_ENV == 'production') {
                window.top.NativeStorage.getItem(key, success => {
                    resolve(success)
                }, error => {
                    reject(error)
                })
            } else {
                if (jysdk.store.state[key] !== undefined && jysdk.store.state[key] !== null) {
                    resolve(jysdk.store.state[key])
                } else {
                    resolve(getLocalStorage(key))
                }
            }
        })

    }
}

export const apiInstaller = () => {
    return {
        name: 'jy_storage',
        api: jy_storage,
    }
}

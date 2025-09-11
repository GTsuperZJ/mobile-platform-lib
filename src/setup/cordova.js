let _injectCordovaPromise = null;
let _injectJSBridgePromise = null;
let _injectHarmonyPromise = null;
let _readyPromise = null;

const isHarmonyOS = function () {
    var u = navigator.userAgent;
    return u.toLowerCase().indexOf('openharmony') !== -1
}

const injectCordova = async function () {
    if (process.env.NODE_ENV != 'production') {
        return
    }
    if (!isHarmonyOS()) {
        var href = window.top.location.href
        let url = href.substring(0, href.indexOf('/www/')) + '/www/cordova.js'
        var scripts = window.top.document.getElementsByName('script')
        for (var s of scripts) {
            var attr = s.getAttribute('src')
            if (attr == url) {
                return
            }
        }
        return new Promise(function (resolve, reject) {
            injectScript(url, (event) => {
                console.log('加载cordova脚本成功')
                resolve()
            }, (event) => {
                reject(new Error('加载cordova脚本失败'))
                console.log('加载cordova脚本失败,调用模拟')
            })
        })
    }
}

const injectJSBridge = async function () {
    if (process.env.NODE_ENV != 'production') {
        return
    }

    var href = window.top.location.href
    let url = ''
    if (href.indexOf('www') != -1) {
        // file或resource开头
        url = href.substring(0, href.indexOf('/www/')) + '/www/js_bridge.js'
    } else {
        // http开头
        url = './js_bridge.js'
    }
    var scripts = window.top.document.getElementsByName('script')
    for(var s of scripts) {
        var attr = s.getAttribute('src')
        if (attr == url) {
            return
        }
    }
    return new Promise(function(resolve, reject) {
        injectScript(url, (event) => {
            console.log('加载js_bridge脚本成功')
            resolve()
        }, (event) => {
            reject(new Error('加载js_bridge脚本失败'))
            console.log('加载js_bridge脚本失败,调用模拟')
        })
    })
}

const injectHarmonyOS = async function () {
    if (process.env.NODE_ENV != 'production') {
        return
    }
    if (isHarmonyOS()) {
        var href = window.top.location.href
        let url = ''
        if (href.indexOf('www') != -1) {
            // file或resource开头
            url = href.substring(0, href.indexOf('/www/')) + '/www/harmony.js'
        } else {
            // http开头
            url = './harmony.js'
        }

        var scripts = window.top.document.getElementsByName('script')
        for (var s of scripts) {
            var attr = s.getAttribute('src')
            if (attr == url) {
                return
            }
        }
        
        return new Promise(function (resolve, reject) {
            injectScript(url, (event) => {
                console.log('加载harmony脚本成功')
                resolve()
            }, (event) => {
                reject(new Error('加载harmony脚本失败'))
                console.log('加载harmony脚本失败,调用模拟')
            })
        })
    }
}

const injectScript = function (url, success, error) {
    var script = window.top.document.createElement('script')
    script.charset = 'utf-8'
    script.async = 'async'
    script.src = url
    script.onerror = error
    script.onload = success
    window.top.document.head.appendChild(script)
}

const setupCordova = function () {
    if (_injectCordovaPromise) {
        return _injectCordovaPromise
    }
    _injectCordovaPromise = injectCordova()
    return _injectCordovaPromise
}

const setupJSBridge = function () {
    if (_injectJSBridgePromise) {
        return _injectJSBridgePromise
    }
    _injectJSBridgePromise = injectJSBridge()
    return _injectJSBridgePromise
}

const setupHarmony = function () {
    if (_injectHarmonyPromise) {
        return _injectHarmonyPromise
    }
    _injectHarmonyPromise = injectHarmonyOS()
    return _injectHarmonyPromise
}

const ready = async function (callback) {
    if(!_readyPromise) {
        if (process.env.NODE_ENV != 'production') {
            _readyPromise = Promise.resolve()
        } else {
            if (!isHarmonyOS()) {
                await _injectCordovaPromise
                _readyPromise = new Promise(function (resolve, reject) {
                    window.top.document.addEventListener('deviceready', () => {
                        resolve()
                    }, false)
                    setTimeout(() => {
                        reject(new Error('cordova 加载超时'))
                    }, 10 * 1000);
                })
            } else {
                // 鸿蒙特殊处理
                await _injectHarmonyPromise
                _readyPromise = new Promise(function (resolve, reject) { 
                    resolve()
                })
            }
        }
    }
    return _readyPromise.then(callback)
}

const isReady = (function() {
    let _isReady = false
    _readyPromise && ready(() => {
        _isReady = true
    })
    return function () {
        return _isReady
    }
})()

export { setupCordova, setupJSBridge, setupHarmony, ready, isReady}
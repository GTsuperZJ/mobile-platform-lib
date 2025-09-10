import jysdk from '../../index'
const noData = '$platform no data$'

export const jy_window = {
	open: ({ appId: appId, path: path, data: data }, callback) => {
		if (window.mock) {
			console.log('mock')
			return
		}
		if (data == '') {
			data = noData
		}
		function hasChinese (str) {
			var reg = /[\u4e00-\u9fa5]/; //使用Unicode范围匹配中文字符
			return reg.test(str);
		}
		if (hasChinese(path)) {
			console.error('path has Chinese')
			return
		}
		window.jyLogEnterTime = ''
		jysdk.platformApi.jy_log.handleLog({ to: window.jyLogTo, from: window.jyLogTo })
		window.top.JSBridge.invoke({
			funcName: 'open',
			data: {
				appId: appId,
				path: path,
				data: data,
			}
		})
		function back (e) {
			let from = {
				meta: {
					log: false,
					page: 'null',
					subsystem: 'null'
				}
			}
			window.jyLogEnterTime = ''
			jysdk.platformApi.jy_log.handleLog({ to: window.jyLogTo, from: from })
			if (e.data.data) {
				if (e.data.data === noData) {
					callback('')
				} else {
					callback(e.data.data)
				}
			} else {
				callback(e.data)
			}
			window.top.document.removeEventListener('close', back)
		}
		window.top.document.addEventListener('close', back)
	},
	getData: (callback) => {
		if (window.mock) {
			console.log('mock')
			return
		}
		window.top.JSBridge.invoke({
			funcName: 'getData',
			success: success => {
				if (success === noData) {
					callback('')
				} else {
					callback(success)
				}
			}
		})
	},
	close: async (data = '') => {
		if (data == '') {
			data = noData
		}
		if (window.mock) {
			console.log('mock')
			return
		}
		if (typeof (data) != 'string') {
			console.error('data must be a string')
			return
		}

		// let res = await jysdk.platformApi.jy_log.handleLog({ to: window.jyLogFrom, from: window.jyLogFrom })
		// console.log('Res', res)
		window.top.JSBridge.invoke({
			funcName: 'close',
			data: data
		})
	},
	checkRouter: (callback) => {
		if (window.mock) {
			console.log('mock')
			callback(true)
			return
		}
		window.top.JSBridge.invoke({
			funcName: 'checkRouter',
			success: success => {
				callback(JSON.parse(success))
			}
		})
	}
}

export const apiInstaller = () => {
	return {
		name: 'jy_window',
		api: jy_window,
	}
}

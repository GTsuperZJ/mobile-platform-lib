export const global_msg = {
	send: ({ appId: appId, data: data }) => {
		if (window.mock) {
			console.log('mock')
			return
		}
		window.top.JSBridge.invoke({
			funcName: 'sendGlobalMsg',
			data: {
				appId: appId,
				data: data
			}
		})
	},
	receive: (callback) => {
		if (window.mock) {
			console.log('mock')
			return
		}
		window.top.document.addEventListener('receiveGlobalMsg', e => {
			callback(e.data.data || e.data)
		})
	},
	dialog: ({ appId: appId, type: type, data: data }) => {
		if (window.mock) {
			console.log('mock')
			return
		}
		window.top.JSBridge.invoke({
			funcName: 'globalDialog',
			data: {
				appId: appId,
				type: type,
				data: data
			}
		})
	}
}

export const apiInstaller = () => {
	return {
		name: 'global_msg',
		api: global_msg,
	}
}

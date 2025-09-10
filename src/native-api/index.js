const requireApiInstallers = require.context(
	// 其组件目录的相对路径
	'.',
	// 是否查询其子目录
	true,
	// 匹配基础组件文件名的正则表达式
	/.+\.js$/
)
var apiInstallers = []
requireApiInstallers.keys().forEach((fileName) => {
	if (!/\.\Windex\.js/.test(fileName)) {
		let { apiInstaller } = requireApiInstallers(fileName)
		apiInstaller && apiInstallers.push(apiInstaller)
	}
})

let apis = null
/**
 * 原生相关api
 * @export nativeApi
 */
export const instance = function () {
	if (apis) {
		return apis
	}
	apis = {}
	apiInstallers.forEach((installer) => {
		let { name, api } = installer()
		apis[name] = api
	})
	return apis
}

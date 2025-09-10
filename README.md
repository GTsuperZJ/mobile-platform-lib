# mobile-platform-lib

## 安装

```js
npm i git+https://gitee.com/zhangjie0301/mobile-platform-lib.git
```



## 引用｜初始化

```js
...
// 在入口文件main.js中，引入sdk
import jysdk from 'mobile-platform-lib'
...

...
// 注意参数的appId 要与manifest.json 里的一致
jysdk.init('com.jylink.mobile.platform.app.demo')
// 为方便引用jysdk，将jysdk加入的vue的原型中
Vue.prototype.$jysdk = jysdk
...

...
// 建议，在js加载完成后，加载初始化Vue，确保之后方法调用成功
jysdk.state.ready(() => {
  console.log('deviceready')
  new Vue({
    ...
  })
})
...
```



## lib目录结构

- mock（dev相关）
- native-api（硬件能力调用）
- platform-api （宿主app相关能力调用）
- setup（注册相关js）
- utils（lib相关工具js）
- index.js（初始化js）



## API

### nativeApi

调用原生能力，目前只封装了数据存取能力，方便开发环境时调用调试

#### API - jy_storage.setItem

存储数据

```js
jysdk.nativeApi.jy_storage.setItem('key', 'value')
```

#### API -jy_storage. getItem

获取数据

```js
jysdk.nativeApi.jy_storage.getItem('111', res => {
  console.log(res)
}, err => {
  console.log(err)
})
```

#### API -jy_storage. getItemAsync

异步获取数据

```js
let value = await jysdk.nativeApi.jy_storage.getItemAsync('key')
```



### platformApi

调用宿主app相关能力，包含微应用的跳转打开，数据传递，相关事件监听等

#### API - jy_window.open

打开新微应用、传递数据并接收数据回调

```js
jysdk.platformApi.jy_window.open({
  appId: 'test', // 目标微应用标识
  path: '#/page1', // 目标微应用路由，如用hash路由则需要加#
  data: this.inputValue // 传递参数，string类型
}, callback => {
  console.log(callback) // 页面关闭回调监听，接收数据回调
})
```

#### API - jy_window.getData

目标微应用接收数据

```js
jysdk.platformApi.jy_window.getData(res => {
  console.log(res) // 接收参数，string类型
})
```

#### API - jy_window.close

关闭微应用并回调数据

```js
jysdk.platformApi.jy_window.close('xxx') // 参数，string类型
```

#### API - jy_window.checkRouter

微应用是否可内部router返回

```js
jysdk.platformApi.jy_window.checkRouter(e => {
  if (e) {
    router.go(-1) // 可返回
  } else {
    jysdk.platformApi.jy_window.close() // 不可返回，关闭当前微应用
  }
})
```

#### API - global_msg.send

微应用发送全局消息给宿主app

```js
jysdk.platformApi.global_msg.send({
  appId: 'test', // 发送消息的本appId
  data: 'xxx' // 全局消息
})
```

#### API - global_msg.receive

微应用监听宿主app的全局消息，如需要，建议放到main.js中进行统一监听

```js
jysdk.platformApi.global_msg.receive(res => {
  console.log('_receive', res)
})
```



## 注意

### lib中的相关依赖版本

```json
"axios": "^0.21.0",
"qs": "^6.11.0",
"vue": "^2.6.14",
"vuex": "^3.4.0"
```

## 版本

### 1.0.0

- 初始化lib


# mobile-platform-lib

通用组件，对接ACC、平台API等。发布在私服http://192.168.55.139:4873

# 安装使用

```shell
npm i mobile-platform-lib --save --registry http://172.24.2.131:8081/repository/npm-group/
```

# 编译发布

## 1. 本地打包

+ 修改`package.json`中 version 版本号
+ npm run lib

## 2. 发布到npm服务器

(新版)账户、密码、邮箱使用 admin admin123 admin@example.org

```shell
 npm login  --registry=http://172.24.2.131:8081/repository/npm-hosted/
 npm publish  --registry=http://172.24.2.131:8081/repository/npm-hosted/
```

# 删除发布包

```
npm unpublish mobile-platform-lib --registry http://172.24.2.131:8081/repository/npm-hosted/ --force
```
# 安装插件

```shell
yarn add mobile-platform-lib --registry http://172.24.2.131:8081/repository/npm-group/
```


# 版本 0.0.2
```
1、添加path中文字符判断
```

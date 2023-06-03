# resume

## 项目介绍

## 运行方式

前端：
```bash
cd client
npm i
#运行
npm run dev
```
在项目运行前，需要在 `src/utils/secret` 文件夹中创建 `key.ts`文件，在里面配置密钥信息：
```js
export const originKey = 'xxxxxxxxxxxxxxxx'; //十六位十六进制的密钥
export const originIv = 'xxxxxxxxxxxxxxxx'; //十六位十六进制的密钥偏移量
```

后端：
```bash
cd server
npm i
#运行
npm index
```
在运行 node 之前，需要在 server 文件夹下创建 `mysql.config.js` 文件，在里面配置数据库信息：
```js
// 为了个人信息安全，单独导出数据库的信息，并且不上传到 git
exports.host = 'localhost';
exports.user = 'root';
exports.password = 'xxx'; //密码
exports.database = 'xxx';  // 数据库名称
```
还需要在 `secret` 文件夹中创建 `key.js`文件，在里面配置密钥信息：
```js
exports.originKey = 'xxxxxxxxxxxxxxxx'; //十六位十六进制的密钥
exports.originIv = 'xxxxxxxxxxxxxxxx'; //十六位十六进制的密钥偏移量
```
== ❗注意❗：因为使用的对称加密，所以**前后端的密钥必须一致！** ==
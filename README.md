# resume

## 项目介绍

## 运行方式

前端：
```bash
cd client
npm i
npm run dev
```

后端：
```bash
cd server
npm i
npm index
```
注意：在运行 node 之前，需要在 server 文件夹下创建 `mysql.config.js` 文件，在里面配置如下信息：
```js
// 为了个人信息安全，单独导出数据库的信息，并且不上传到 git
exports.host = 'localhost';
exports.user = 'root';
exports.password = 'xxx'; //密码
exports.database = 'xxx';  // 数据库名称
```
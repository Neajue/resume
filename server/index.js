const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors')
const bodyParser = require('body-parser')
const mysqlConfig = require('./mysql.config');

app.use(bodyParser.json());  //配置解析，用于解析json和urlencoded格式的数据
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())              //配置跨域，必须在路由之前

app.listen(3001, () => {
  console.log("服务器开启3001端口...")
})

// 创建与数据库的连接
const db = mysql.createConnection(mysqlConfig);

db.connect((err) => {
  if (err) throw err;
  console.log("数据库连接成功");
})

app.use('/api/*', function (req, res, next) {
  // 设置请求头为允许跨域
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Credentials", "true");
  // 设置服务器支持的所有头信息字段
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  // 设置服务器支持的所有跨域请求的方法
  res.header("Access-Control-Allow-Methods", "POST,GET,DELETE");
  // next()方法表示进入下一个路由
  next();
});

const selectUser = (tableName, key, type) => {
  const sql = type == 'userId' ?
    `select * from ${tableName} where userId = '${key}'` :
    `select * from ${tableName} where accountName = '${key}'`;
  console.log(sql);
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err.message);
        reject('error');
      } else {
        const dataString = JSON.stringify(result);
        const data = JSON.parse(dataString);
        console.log(data);
        resolve(data);
      }
    })
  })
}

//字符串 Base64 编码函数
const Base64encode = (str) => {
  return Buffer.from(str).toString('base64');
}

//字符串 Base64 解码函数
const Base64decode = (str) => {
  return Buffer.from(str, 'base64').toString('ascii');
}

// 登录
// http://localhost:3001/api/login
app.post("/api/login", async (req, res) => {
  const { accountName, password } = req.body.params;
  const passBtoa = Base64decode(password);  // 对传输的密码进行 base64 解码
  let result = await selectUser('account_info', accountName, 'accountName');
  if (result != 'error') {
    if (result.length > 0) {
      if (result[0].password == passBtoa) {
        res.send({
          Code: 200,
          Message: '登陆成功',
          Data: {
            accountName: result[0].accountName,
            userId: result[0].userId,
          },
        })
      } else {
        res.send({
          Code: 403,
          Message: '密码错误',
          Data: null,
        })
      }
    } else {
      res.send({
        Code: 403,
        Message: '该用户不存在',
        Data: null,
      });
    }
  } else {
    res.status(500);
    res.send({
      Code: res.statusCode,
      Message: '服务器错误',
      Data: null,
    })
  }
})

// 注册
// http://localhost:3001/api/register
app.post("/api/register", async (req, res) => {
  const { accountName, password, userId } = req.body.params;
  const passBtoa = Base64decode(password);  // 对传输的密码进行 base64 解码
  const userList = await selectUser('account_info', accountName, 'accountName');
  if (userList != 'error') {
    if (userList.length > 0) {
      res.send({
        Code: 403,
        Message: '该用户名已存在，请更改用户名',
        Data: null,
      })
    } else {
      const sql = `insert into account_info (accountName, password, userId) values ('${accountName}', '${passBtoa}', ${userId})`;
      console.log(sql);
      db.query(sql, (err, result) => {
        if (err) {
          res.status(500);
          res.send({
            Code: res.statusCode,
            Message: '服务器错误',
            Data: null,
          })
          console.log(err.message);
        } else {
          res.send({
            Code: 200,
            Message: '注册成功',
            Data: null,
          })
        }
      })
    }
  } else {
    res.status(500);
    res.send({
      Code: res.statusCode,
      Message: '服务器错误',
      Data: null,
    })
  }
})

// 在所有路由后面配置错误路由
app.use((req, res) => {
  res.status(404)
  res.send("您访问的地址已被外星人劫持！")
})
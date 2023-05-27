const express = require("express");
// const router = express.Router();
const app = express();
const mysql = require("mysql");
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json());  //配置解析，用于解析json和urlencoded格式的数据
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())              //配置跨域，必须在路由之前

app.listen(3001, ()=>{
  console.log("服务器开启3001端口...")
})

// 创建与数据库的连接
const db = mysql.createConnection({
  host:'localhost',
  user:"root",
  password:'gqf.20001228',
  database:"resume"    //数据库名称
})

db.connect((err)=>{
  if(err) throw err;
  console.log("数据库连接成功");
})

app.use('/api/*', function(req, res, next) {
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

// 登录
// http://localhost:3001/api/login
app.post("/api/login", (req, res)=>{
  const { accountName, password } = req.query;
  const sql = "select * from account_info where accountName = " + "'" + accountName + "'";
  db.query(sql,(err, result)=>{
    if(err){
      res.status(500);
      res.send({
        Code: res.statusCode,
        Message: '服务器错误',
        Data: null,
      })
      console.log(err.message);
    } else {
      const dataString = JSON.stringify(result);
      const data = JSON.parse(dataString);
      if(data.length > 0) {
        if(data[0].password == password) {
          res.send({
            Code: res.statusCode,
            Message: '登陆成功',
            Data: null,
          })
        } else {
          res.status(403);
          res.send({
            Code: res.statusCode,
            Message: '密码错误',
            Data: null,
          })
        }
      } else {
        res.status(403);
        res.send({
          Code: res.statusCode,
          Message: '用户名错误',
          Data: null,
        })
      }
    }
  })
})


// 在所有路由后面配置错误路由
app.use((req, res) => {
  res.status(404)
  res.send("您访问的地址已被外星人劫持！")
})
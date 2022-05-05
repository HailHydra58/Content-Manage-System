const mysql = require("mysql");

//配置数据库连接
const db = mysql.createConnection({
  host: "localhost", //连接的数据库地址  也可以写成 127.0.0.1  也同样代表代表的是本机地址
  user: "root", //数据库的账号名
  password: "", //数据库的密码
  database: "backstage", //要连接的数据库名
  port: "3306", //数据库的端口号
});

//导出
module.exports = db;

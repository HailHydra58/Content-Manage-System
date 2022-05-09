//创建服务
const express = require("express");
const app = express();
//引入cors(跨域)
const cors = require("cors");
//引入session模块
const session = require("express-session");
//引入模块
const user = require("./router/user.js");
const notice = require("./router/notice.js");
const student = require("./router/student.js");
const noticeAdminister = require("./router/noticeAdminister.js");
const adminAdminister = require("./router/adminAdminister.js");

//解析post数据  不用记
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//解决跨域
app.use(cors({ credentials: true, origin: true }));
//配置session
app.use(
  session({
    secret: "username",
    name: "username",
    resave: true, //是否重新计算
    saveUninitialized: true,
    cookie: {
      maxAge: 300000, //毫秒数(5分钟)
    },
  })
);

//拦截所有接口
app.all("*", (req, res, next) => {
  //判断是否登录接口
  let urladdress = req.url.split("?")[0];
  if (urladdress == "/login") {
    console.log("登录请求 放行");
    next();
  } else {
    //其他接口就都需要判断有没有登陆者信息
    if (req.session.username) {
      next();
    } else {
      //返回状态码，让前端去判断201来跳转页面
      res.json({
        code: 201,
        msg: "登录信息过期，请重新登录",
      });
    }
  }
});

//将路由挂载到服务上
app.use(user);
app.use(notice);
app.use(student);
app.use(noticeAdminister);
app.use(adminAdminister);

app.listen(3000, () => {
  console.log("服务已开启，端口号3000");
});

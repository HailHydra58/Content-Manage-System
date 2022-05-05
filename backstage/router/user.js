const express = require("express");
const router = express.Router();

//引入数据库
let db = require("../utils/user.js");

router.get("/login", (req, res) => {
  let id = req.query.id;
  let pwd = req.query.pwd;
  let database;
  let ids;
  let pwds;

  //判断学生还是管理员
  if (req.query.radio == 1) {
    //学生
    database = "student";
    ids = "stu_num";
    pwds = "stu_pwd";
  } else {
    //管理员
    database = "admins";
    ids = "admin_account";
    pwds = "admin_pwd";
  }

  let sql = `SELECT * FROM ${database} WHERE ${ids}=? AND ${pwds}=?`;
  db.query(sql, [id, pwd], (err, data) => {
    if (err) {
      console.log("sql报错了");
      res.json({
        code: 500,
        msg: "服务器繁忙，请稍后重试",
      });
    } else {
      if (data.length == 0) {
        res.json({
          code: 201,
          msg: "登录失败，账号密码错误",
          data,
        });
      } else {
        //在确定有这个人，应该将登陆者信息存在session里面去
        req.session.user = data[0].id;

        res.json({
          code: 200,
          msg: "登陆成功",
          data,
        });
      }
    }
  });
});

module.exports = router;

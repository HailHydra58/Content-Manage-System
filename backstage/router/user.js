const express = require("express");
const router = express.Router();

//引入数据库
let db = require("../utils/user.js");

//登录
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
          code: 205,
          msg: "登录失败，账号密码错误",
        });
      } else {
        //在确定有这个人，应该将登陆者信息存在session里面去
        req.session.username = data[0].admin_name;

        res.json({
          code: 200,
          msg: "登陆成功",
          data,
        });
      }
    }
  });
});

//宿舍管理
router.get("/dormitoryManagement", (req, res) => {
  let sql = `SELECT dormitory_id,dormitory_name,
  (SELECT COUNT(*) 'count' FROM student WHERE student.stu_dorm_id = dormitory.dormitory_id) AS num,
  dormitory_balance,balance_state FROM dormitory`;
  db.query(sql, (err, data) => {
    if (err) {
      console.log("sql报错了");
      res.json({
        code: 500,
        msg: "服务器繁忙，请稍后重试",
      });
    } else {
      if (data.length == 0) {
        res.json({
          code: 404,
          msg: "找不到数据",
        });
      } else {
        res.json({
          code: 200,
          msg: "宿舍管理数据请求成功",
          data,
        });
      }
    }
  });
});

//分页
router.get("/paging", (req, res) => {
  let pageNum = (req.query.pageNum - 1) * 5; // 第几页

  let sql = `SELECT dormitory_id,dormitory_name,
  (SELECT COUNT(*) 'count' FROM student WHERE student.stu_dorm_id = dormitory.dormitory_id) AS num,
  dormitory_balance,balance_state FROM dormitory limit ${pageNum},5`;
  db.query(sql, (err, data) => {
    if (err) {
      console.log("sql报错了");
      res.json({
        code: 500,
        msg: "服务器繁忙，请稍后重试",
      });
    } else {
      if (data.length == 0) {
        res.json({
          code: 404,
          msg: "找不到数据",
        });
      } else {
        res.json({
          code: 200,
          msg: "宿舍管理数据请求成功",
          data,
        });
      }
    }
  });
});

//删除宿舍
router.post("/deleteTheDormitory", (req, res) => {
  let dormitory_id = req.body.dormitory_id;

  let sql = `DELETE FROM dormitory WHERE dormitory_id=?`;
  db.query(sql, [dormitory_id], (err, data) => {
    if (err) {
      console.log("sql报错了");
      res.json({
        code: 500,
        msg: "服务器繁忙，请稍后重试",
      });
    } else {
      if (data.length == 0) {
        res.json({
          code: 404,
          msg: "找不到数据",
        });
      } else {
        res.json({
          code: 200,
          msg: "删除宿舍请求成功",
          data,
        });
      }
    }
  });
});

//修改宿舍
router.post("/modifyTheDormitory", (req, res) => {
  let dormitory_id = req.body.dormitory_id;
  let dormitory_name = req.body.dormitory_name;
  let dormitory_balance = req.body.dormitory_balance;

  let sql = `UPDATA dormitory SET dormitory_name=?,dormitory_balance=? WHERE dormitory_id=?`;
  db.query(
    sql,
    [dormitory_name, dormitory_balance, dormitory_id],
    (err, data) => {
      if (err) {
        console.log("sql报错了");
        res.json({
          code: 500,
          msg: "服务器繁忙，请稍后重试",
        });
      } else {
        if (data.length == 0) {
          res.json({
            code: 404,
            msg: "找不到数据",
          });
        } else {
          res.json({
            code: 200,
            msg: "修改宿舍请求成功",
            data,
          });
        }
      }
    }
  );
});

//查询宿舍
router.get("/queryTheDormitory", (req, res) => {
  let dormitory_id = req.query.dormitory_id;
  let dormitory_name = req.query.dormitory_name;

  //通过模糊查询编号或者名字
  let sql = `SELECT dormitory_id,dormitory_name,
  (SELECT COUNT(*) 'count' FROM student WHERE student.stu_dorm_id = dormitory.dormitory_id) AS num,
  dormitory_balance,balance_state FROM dormitory WHERE dormitory_id LIKE "%?%" OR dormitory_name LIKE "%?%" `;
  db.query(sql, [dormitory_id, dormitory_name], (err, data) => {
    if (err) {
      console.log("sql报错了");
      res.json({
        code: 500,
        msg: "服务器繁忙，请稍后重试",
      });
    } else {
      if (data.length == 0) {
        res.json({
          code: 404,
          msg: "找不到数据",
        });
      } else {
        res.json({
          code: 200,
          msg: "查询宿舍请求成功",
          data,
        });
      }
    }
  });
});

//添加宿舍
router.get("/addTheDormitory", (req, res) => {
  let dormitory_name = req.query.dormitory_name;
  let dormitory_balance = req.query.dormitory_balance;
  let balance_state = null;
  dormitory_balance <= 0 ? (balance_state = 0) : (balance_state = 1);

  let sql = `INSERT INTO dormitory VALUES(NULL,"?",?,?)`;
  db.query(
    sql,
    [dormitory_name, dormitory_balance, balance_state],
    (err, data) => {
      if (err) {
        console.log("sql报错了");
        res.json({
          code: 500,
          msg: "服务器繁忙，请稍后重试",
        });
      } else {
        if (data.length == 0) {
          res.json({
            code: 404,
            msg: "找不到数据",
          });
        } else {
          res.json({
            code: 200,
            msg: "添加宿舍请求成功",
            data,
          });
        }
      }
    }
  );
});

module.exports = router;

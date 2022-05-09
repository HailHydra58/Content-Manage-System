const express = require("express");
const router = express.Router();

//引入数据库
let db = require("../utils/user.js");

//公告数据
router.get("/admins", (req, res) => {
  let sql = `SELECT * FROM admins`;
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
          msg: "管理员数据请求成功",
          data,
        });
      }
    }
  });
});

//搜索
router.get("/adminsSearch", (req, res) => {
  let value = req.query.value;

  let sql = `SELECT * FROM admins WHERE admin_id LIKE "%${value}%" OR admin_account LIKE "%${value}%" OR admin_root LIKE "%${value}%" OR
  admin_name LIKE "%${value}%"`;
  db.query(sql, (err, data) => {
    if (err) {
      console.log("sql报错了");
      res.json({
        code: 500,
        msg: "服务器繁忙，请稍后重试",
      });
    } else {
      console.log(data);
      if (data.length == 0) {
        res.json({
          code: 404,
          msg: "找不到数据",
        });
      } else {
        res.json({
          code: 200,
          msg: "查找成功",
          data,
        });
      }
    }
  });
});

//添加
router.post("/adminsAdd", (req, res) => {
  let admin_account = req.body.admin_account;
  let admin_pwd = req.body.admin_pwd;
  let admin_root = req.body.admin_root;
  let admin_name = req.body.admin_name;

  let sql = `INSERT INTO admins VALUES(NULL,?,?,?,?)`;
  db.query(
    sql,
    [admin_account, admin_pwd, admin_root, admin_name],
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
            msg: "添加管理员成功",
            data,
          });
        }
      }
    }
  );
});

//修改
router.post("/adminsChange", (req, res) => {
  let admin_id = Number(req.body.admin_id);
  let admin_name = req.body.admin_name;
  let admin_root = Number(req.body.admin_root);
  let admin_pwd = req.body.admin_pwd;

  let sql = `UPDATE admins SET admin_name=?,admin_root=?,admin_pwd=? WHERE admin_id=?`;
  db.query(sql, [admin_name, admin_root, admin_pwd, admin_id], (err, data) => {
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
          msg: "管理员信息修改成功",
          data,
        });
      }
    }
  });
});

//删除
router.post("/adminsDelete", (req, res) => {
  let admin_id = Number(req.body.admin_id);

  //删除学生
  let sql = `DELETE FROM admins WHERE admin_id=${admin_id}`;
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
          msg: "删除管理员成功",
          data,
        });
      }
    }
  });
});

module.exports = router;

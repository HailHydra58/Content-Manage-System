const express = require("express");
const router = express.Router();

//引入数据库
let db = require("../utils/user.js");

//公告数据
router.get("/notice", (req, res) => {
  let sql = `SELECT notice_id,notice_title,notice_content,notice_time,
  (SELECT admin_name FROM admins WHERE admins.admin_id = notice.notice_admin_id) AS notice_admin_id 
  FROM notice`;
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
          msg: "公告数据请求成功",
          data,
        });
      }
    }
  });
});

//搜索
router.get("/noticeSearch", (req, res) => {
  let value = req.query.value;

  let sql = `SELECT * FROM notice WHERE notice_id LIKE "%${value}%" OR notice_title LIKE "%${value}%" OR notice_content LIKE "%${value}%" OR
  notice_time LIKE "%${value}%" OR notice_admin_id LIKE "%${value}%"`;
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
          msg: "公告查找成功",
          data,
        });
      }
    }
  });
});

//添加
router.post("/noticeAdd", (req, res) => {
  let notice_title = req.body.notice_title;
  let notice_content = req.body.notice_content;
  let notice_time = req.body.notice_time;
  let notice_admin_id = Number(req.body.notice_admin_id);

  let sql = `INSERT INTO notice VALUES(NULL,?,?,?,?)`;
  db.query(
    sql,
    [notice_title, notice_content, notice_time, notice_admin_id],
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
            msg: "添加公告成功",
            data,
          });
        }
      }
    }
  );
});

//删除
router.post("/noticeDelete", (req, res) => {
  let notice_id = Number(req.body.notice_id);

  //删除学生
  let sql = `DELETE FROM notice WHERE notice_id=${notice_id}`;
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
          msg: "删除公告成功",
          data,
        });
      }
    }
  });
});

//修改
router.post("/noticeChange", (req, res) => {
  let notice_id = req.body.notice_id;
  let notice_title = req.body.notice_title;
  let notice_content = req.body.notice_content;

  let sql = `UPDATE notice SET notice_title=?,notice_content=? WHERE notice_id=?`;
  db.query(sql, [notice_title, notice_content, notice_id], (err, data) => {
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
          msg: "公告信息修改成功",
          data,
        });
      }
    }
  });
});

module.exports = router;

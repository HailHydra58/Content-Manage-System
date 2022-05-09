const express = require("express");
const router = express.Router();

//引入数据库
let db = require("../utils/user.js");

//获取公告
router.get("/announcement", (req, res) => {
  let sql = `SELECT * FROM notice`;
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
          msg: "获取公告成功",
          data,
        });
      }
    }
  });
});

module.exports = router;

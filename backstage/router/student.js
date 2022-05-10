const express = require("express");
const router = express.Router();

//引入数据库
let db = require("../utils/user.js");

//学生管理数据
router.get("/stuData", (req, res) => {
  let sql;
  if (req.query.stu_id) {
    sql = `SELECT stu_num,stu_name,stu_dorm_id,
    (SELECT dormitory_balance FROM dormitory WHERE dormitory.dormitory_id = student.stu_dorm_id) dormitory_balance,
    (SELECT balance_state FROM dormitory WHERE dormitory.dormitory_id = student.stu_dorm_id) balance_state 
    FROM student WHERE stu_id=${req.query.stu_id}`;
  } else {
    sql = `SELECT stu_num,stu_name,stu_dorm_id,
    (SELECT dormitory_balance FROM dormitory WHERE dormitory.dormitory_id = student.stu_dorm_id) dormitory_balance,
    (SELECT balance_state FROM dormitory WHERE dormitory.dormitory_id = student.stu_dorm_id) balance_state 
    FROM student`;
  }

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
          msg: "学生数据请求成功",
          data,
        });
      }
    }
  });
});

//删除
router.post("/stuDelete", (req, res) => {
  let stu_num = req.body.stu_num; //学号
  let stu_id; //学生id

  let sql_2 = `SELECT stu_id FROM student WHERE stu_num=${stu_num}`;
  //拿到学生id
  db.query(sql_2, (err2, data2) => {
    if (err2) {
      console.log("sql报错了");
      res.json({
        code: 500,
        msg: "服务器繁忙，请稍后重试",
      });
    } else {
      //赋值学生id
      stu_id = data2[0].stu_id;
      //先删缴费记录(因为学生表是其主表)
      let sql_1 = `DELETE FROM payment_record WHERE payment_record_stu_id=?`;
      db.query(sql_1, [stu_id], (err, data) => {
        if (err) {
          console.log("sql报错了");
          res.json({
            code: 500,
            msg: "服务器繁忙，请稍后重试",
          });
        } else {
          //删除学生
          let sql = `DELETE FROM student WHERE stu_id=?`;
          db.query(sql, [stu_id], (err, data) => {
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
                  msg: "删除学生成功",
                  data,
                });
              }
            }
          });
        }
      });
    }
  });
});

//修改
router.post("/stuChange", (req, res) => {
  let stu_num = req.body.stu_num; //学号
  let stu_name = req.body.stu_name; //姓名
  let stu_dorm_id = Number(req.body.stu_dorm_id); //宿舍id

  let sql = `UPDATE student SET stu_name=?,stu_dorm_id=? WHERE stu_num=?`;
  db.query(sql, [stu_name, stu_dorm_id, stu_num], (err, data) => {
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
          msg: "学生信息修改成功",
          data,
        });
      }
    }
  });
});

//搜索
router.get("/stuSearch", (req, res) => {
  let value1 = req.query.value;
  let value2 = Number(req.query.value);

  //未写完,还差所属宿舍查询
  let sql = `SELECT stu_num,stu_name,stu_dorm_id,
  (SELECT dormitory_balance FROM dormitory WHERE dormitory.dormitory_id = student.stu_dorm_id) dormitory_balance,
  (SELECT balance_state FROM dormitory WHERE dormitory.dormitory_id = student.stu_dorm_id) balance_state 
  FROM student WHERE stu_num LIKE "%${value1}%" OR stu_name LIKE "%${value1}%"`;
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
          msg: "学生查找成功",
          data,
        });
      }
    }
  });
});

//添加
router.post("/stuAdd", (req, res) => {
  let stu_name = req.body.stu_name;
  let stu_sex = req.body.stu_sex;
  let stu_num = req.body.stu_num;
  let stu_pwd = req.body.stu_pwd;
  let stu_dorm_id = Number(req.body.stu_dorm_id);

  let sql = `INSERT INTO student VALUES(NULL,?,?,?,?,?)`;
  db.query(
    sql,
    [stu_name, stu_sex, stu_num, stu_pwd, stu_dorm_id],
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
            msg: "添加学生成功",
            data,
          });
        }
      }
    }
  );
});

//缴费记录
router.get("/payTheFees", (req, res) => {
  let stu_num = req.query.stu_num;

  let sql = `SELECT stu_id,stu_name FROM student WHERE stu_num=${stu_num}`;
  db.query(sql, (err, data) => {
    if (err) {
      console.log("sql报错了");
      res.json({
        code: 500,
        msg: "服务器繁忙，请稍后重试",
      });
    } else {
      let stu_id = data[0].stu_id;
      let stu_name = data[0].stu_name;

      let sql_1 = `SELECT payment_record_money,payment_record_time FROM payment_record WHERE payment_record_stu_id=${stu_id}`;
      db.query(sql_1, (err_1, data_1) => {
        if (err_1) {
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
            for (let i = 0; i < data_1.length; i++) {
              const item = data_1[i];
              item.stu_name = stu_name;
            }
            res.json({
              code: 200,
              msg: "缴费记录数据请求成功",
              data: data_1,
            });
          }
        }
      });
    }
  });
});

//学生充值
router.post("/topUp", (req, res) => {
  let oldMoney = parseFloat(req.body.oldMoney);
  let newMoney = parseFloat(req.body.topUp);
  let dormitory_balance = oldMoney + newMoney;
  let dromitory_id = Number(req.body.stu_dorm_id);

  let sql = `UPDATE dormitory SET dormitory_balance=? WHERE dormitory_id=?`;
  db.query(sql, [dormitory_balance, dromitory_id], (err, data) => {
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
          msg: "充值成功",
          data,
        });
      }
    }
  });
});

module.exports = router;

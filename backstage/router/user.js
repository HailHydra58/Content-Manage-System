const express = require("express")
const router = express.Router()

//引入数据库
let db = require("../utils/user.js")

router.get("/login", (req, res) => {
	let id = Number(req.query.id)
	let pwd = req.query.pwd

	let sql = "SELECT * FROM user WHERE id=? AND pwd=?"
	db.query(sql, [id, pwd], (err, data) => {
		if (err) {
			console.log("sql报错了");
			res.json({
				code:500,
				msg:"服务区繁忙，请稍重试"
			})
		} else{
			if (data.length == 0) {
				res.json({
					code:200,
					msg:"查无此人",
					data
				})
			} else{
				//在确定有这个人，应该将登陆者信息存在session里面去
				req.session.user = data[0].id
				
				res.json({
					code:200,
					msg:"登陆成功",
					data
				})
			}
		}
	})
})

module.exports = router

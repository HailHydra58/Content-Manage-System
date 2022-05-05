CREATE DATABASE backstage;

USE backstage;

-- 学生表
CREATE TABLE student(
  stu_id INT PRIMARY KEY AUTO_INCREMENT,
  stu_name VARCHAR(40),
  stu_sex CHAR(4),
  stu_num VARCHAR(10),
  stu_pwd VARCHAR(20),
  stu_dorm_id INT
);

-- 管理员表
CREATE TABLE admins (
  admin_id INT PRIMARY KEY AUTO_INCREMENT,
  admin_account VARCHAR(20),
  admin_pwd VARCHAR(20),
  admin_root INT,
  admin_name VARCHAR(40)
);

-- 公告表
CREATE TABLE notice(
  notice_id INT PRIMARY KEY AUTO_INCREMENT,
  notice_title VARCHAR(40),
  notice_content VARCHAR(800),
  notice_time VARCHAR(20),
  notice_admin_id INT
);

-- 缴费记录表
CREATE TABLE payment_record(
  payment_record_id INT PRIMARY KEY AUTO_INCREMENT,
  payment_record_money FLOAT,
  payment_record_time VARCHAR(20),
  payment_record_stu_id INT
);

-- 宿舍表
CREATE TABLE dormitory(
  dormitory_id INT PRIMARY KEY AUTO_INCREMENT,
  dormitory_name VARCHAR(10),
  dormitory_balance FLOAT,
  balance_state INT
);

-- 绑定外键
ALTER TABLE student ADD CONSTRAINT stu_dorm_id_dormitory_id FOREIGN KEY(stu_dorm_id) REFERENCES dormitory(dormitory_id);
ALTER TABLE notice ADD CONSTRAINT notice_admin_id_admin_id FOREIGN KEY(notice_admin_id) REFERENCES admins(admin_id);
ALTER TABLE payment_record ADD CONSTRAINT payment_record_stu_id_stu_id FOREIGN KEY(payment_record_stu_id) REFERENCES student(stu_id);

-- 添加管理员数据
INSERT INTO admins VALUES
(1,"1001","123456",1,"李思町"),
(NULL,"1002","123456",0,"海德拉"),
(NULL,"1003","123456",0,"凯尔"),
(NULL,"1004","123456",0,"莫甘娜");

-- 添加公告表数据
INSERT INTO notice VALUES
(1,"2022年春节放假时间安排","2022年1月31日（除夕、周一）－2022年2月6日（初六、周日），共放假7天，其中2022年1月29日（周六）、2022年1月30日（周日）正常上班调休。","2022.1.15",1),
(NULL,"2022年清明节放假时间安排","2022年4月3日（周日）－2022年4月5日（周二），共放假3天，其中2022年4月2日（周六）正常上班调休。","2022.4.1",1),
(NULL,"2022年五一劳动节放假时间安排","2022年4月30日（周六）-2022年5月4日（周三），共放假5天，其中2022年4月24日（周日）、2022年5月7日（周六）正常上班调休。","2022.4.28",1),
(NULL,"2022年端午节放假时间安排","2022年6月3日（周五）－2022年6月5日（周日），共放假3天","2022.6.1",1),
(NULL,"2022年中秋节放假时间安排","2022年9月10日（周六）－2022年9月12日（周一），共放假3天。","2022.9.7",1),
(NULL,"2022年国庆节放假时间安排","2022年10月1日（周六）－2022年10月7日（周五），共放假7天，其中2022年10月8日（周六）和2022年10月9日（周日）为正常上班调休时间。","2022.9.28",1);

-- 添加宿舍表数据
INSERT INTO dormitory VALUES
(120301,"轩和居",61.58,1),
(NULL,"楚枫轩",58,1),
(NULL,"豪华酒店",42.1,1),
(NULL,"万妖洞",94.2,1),
(NULL,"友爱的一家",19.4,1),
(NULL,"好来屋",50.2,1),
(NULL,"衮雪堂",57.69,1),
(NULL,"北c309的东厂",70,1),
(NULL,"秋名山",80.9,1),
(NULL,"舒服家",88.44,1),
(NULL,"汇贤雅居",32,1),
(NULL,"枫楚偲",38.6,1),
(NULL,"静心斋",66.66,1);

-- 添加学生表数据
INSERT INTO student VALUES
(1,"提莫","男","2051910020","123456",120301),
(NULL,"赵信","男","2051910021","123456",120301),
(NULL,"塞拉斯","男","2051910022","123456",120301),
(NULL,"光辉","女","2051910023","123456",120302),
(NULL,"猪妹","女","2051910024","123456",120302),
(NULL,"寒冰","女","2051910025","123456",120302),
(NULL,"蛮王","男","2051910026","123456",120303),
(NULL,"扎克","男","2051910027","123456",120303),
(NULL,"挖掘机","女","2051910028","123456",120304),
(NULL,"琪亚娜","女","2051910029","123456",120304),
(NULL,"瑞文","女","2051910030","123456",120304),
(NULL,"青钢影","女","2051910031","123456",120304),
(NULL,"刀妹","女","2051910032","123456",120305),
(NULL,"剑姬","女","2051910033","123456",120305),
(NULL,"盖伦","男","2051910034","123456",120306),
(NULL,"诺手","男","2051910035","123456",120306),
(NULL,"猴子","男","2051910036","123456",120306),
(NULL,"腕豪","男","2051910037","123456",120306),
(NULL,"剪刀妹","女","2051910038","123456",120307),
(NULL,"破败王","男","2051910039","123456",120308),
(NULL,"豹女","女","2051910040","123456",120309),
(NULL,"风女","女","2051910041","123456",120309),
(NULL,"日女","女","2051910042","123456",120309),
(NULL,"女枪","女","2051910043","123456",120310),
(NULL,"女警","女","2051910044","123456",120310),
(NULL,"剑魔","男","2051910045","123456",120311),
(NULL,"莫德凯撒","男","2051910046","123456",120312),
(NULL,"艾克","男","2051910020","123447",120313);

-- 添加缴费记录表数据
INSERT INTO payment_record VALUES
(1,58,"2022.5.1",1),
(NULL,100,"2022.5.1",2),
(NULL,56,"2022.5.1",3),
(NULL,85,"2022.5.1",4),
(NULL,46,"2022.5.1",5),
(NULL,89,"2022.5.1",6),
(NULL,15,"2022.5.1",7),
(NULL,35,"2022.5.1",8),
(NULL,56,"2022.5.1",9),
(NULL,89,"2022.5.1",10),
(NULL,65,"2022.5.1",11),
(NULL,34,"2022.5.1",12),
(NULL,65,"2022.5.1",13),
(NULL,45,"2022.5.1",14),
(NULL,19,"2022.5.1",15),
(NULL,57,"2022.5.1",16);
<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};

//员工  root(1:店长/2:采购/3:销售)
let staff = [
  {
    jobNumber: 1001,
    name: "李思町",
    sex: "男",
    signIn: 0,
    tel: 17778333525,
    pwd: "123456987",
    root: 1,
  },
  {
    jobNumber: 1002,
    name: "黄鑫龙",
    sex: "男",
    signIn: 0,
    tel: 19136180514,
    pwd: "123456987",
    root: 2,
  },
  {
    jobNumber: 1003,
    name: "李才秀",
    sex: "女",
    signIn: 0,
    tel: 15528455256,
    pwd: "123456987",
    root: 2,
  },
  {
    jobNumber: 1004,
    name: "王涛",
    sex: "男",
    signIn: 0,
    tel: 18285569280,
    pwd: "123456987",
    root: 3,
  },
  {
    jobNumber: 1005,
    name: "尹航",
    sex: "男",
    signIn: 0,
    tel: 18444551526,
    pwd: "123456987",
    root: 2,
  },
  {
    jobNumber: 1006,
    name: "高元然",
    sex: "男",
    signIn: 0,
    tel: 18457762084,
    pwd: "123456987",
    root: 3,
  },
];
//转换并存值
// localStorage.setItem("staff", JSON.stringify(staff));

//会员  integral(积分) record(购买记录)
//vip(1:不打折/2:95折/3:9折/4:8.5折/5:8折)
let user = [
  {
    id: 20010412,
    name: "李骏町豪",
    integral: 122,
    record: [
      {
        time: "2022-02-11 14:55:29",
        food: [1, 2, 3],
      },
      {
        time: "2022-02-11 14:55:29",
        food: [4, 2, 1],
      },
      {
        time: "2022-02-11 14:55:29",
        food: [5, 2, 3],
      },
    ],
    vip: 1,
  },
  {
    id: 20010112,
    name: "王海",
    integral: 0,
    record: [],
    vip: 1,
  },
  {
    id: 20010113,
    name: "刘人于",
    integral: 0,
    record: [],
    vip: 1,
  },
  {
    id: 20010111,
    name: "刘星",
    integral: 0,
    record: [],
    vip: 1,
  },
  {
    id: 20000112,
    name: "王程",
    integral: 0,
    record: [],
    vip: 1,
  },
  {
    id: 20010212,
    name: "何雨莹",
    integral: 0,
    record: [],
    vip: 1,
  },
  {
    id: 20011212,
    name: "何润东",
    integral: 0,
    record: [],
    vip: 1,
  },
  {
    id: 20011112,
    name: "刘锡",
    integral: 0,
    record: [],
    vip: 1,
  },
  {
    id: 20011012,
    name: "李斯思",
    integral: 0,
    record: [],
    vip: 1,
  },
  {
    id: 20010912,
    name: "李恒一",
    integral: 0,
    record: [],
    vip: 1,
  },
  {
    id: 20010812,
    name: "张宏",
    integral: 0,
    record: [],
    vip: 1,
  },
  {
    id: 20010712,
    name: "张洪",
    integral: 0,
    record: [],
    vip: 1,
  },
  {
    id: 20010612,
    name: "王洪",
    integral: 0,
    record: [],
    vip: 1,
  },
  {
    id: 20010102,
    name: "陈成",
    integral: 0,
    record: [],
    vip: 1,
  },
  {
    id: 20020113,
    name: "高源",
    integral: 0,
    record: [],
    vip: 1,
  },
];
//转换并存值
// localStorage.setItem("user", JSON.stringify(user));

//公告 publisher(发布人)
let notice = [
  {
    content: "大家元旦快乐,晚上早一个小时下班",
    time: "2022-01-01 8:54",
    publisher: 1001, //jobNumber
  },
  {
    content: "近日疫情严重,请大家务必带好口罩,早上测温上班",
    time: "2022-02-04 19:00",
    publisher: 1001, //jobNumber
  },
  {
    content: "再次申明,客人进店要扫场所码,拒绝红码、黄码客人入店",
    time: "2022-02-05 10:00",
    publisher: 1001, //jobNumber
  },
  {
    content: "仓库草莓原材料紧缺,这两天停售关于草莓的所有商品并给客人耐心解释",
    time: "2022-03-02 8:00",
    publisher: 1002, //jobNumber
  },
  {
    content: "今日市场监管局来店铺内查看检查,最终评价为优",
    time: "2022-04-12 13:00",
    publisher: 1003, //jobNumber
  },
];
//转换并存值
// localStorage.setItem("notice", JSON.stringify(notice));

//商品 category(类别)
let food = [
  {
    id: 101,
    name: "草莓蛋糕",
    category: "蛋糕", //类别
    price: "20", //售价
    qgp: 7, //保质期
  },
  {
    id: 102,
    name: "蓝莓蛋糕",
    category: "蛋糕", //类别
    price: "20", //售价
    qgp: 7, //保质期
  },
  {
    id: 103,
    name: "榴莲蛋糕",
    category: "蛋糕", //类别
    price: "30", //售价
    qgp: 7, //保质期
  },
  {
    id: 104,
    name: "树莓蛋糕",
    category: "蛋糕", //类别
    price: "25", //售价
    qgp: 7, //保质期
  },
  {
    id: 105,
    name: "香蕉蛋糕",
    category: "蛋糕", //类别
    price: "20", //售价
    qgp: 7, //保质期
  },
  {
    id: 106,
    name: "芒果蛋糕",
    category: "蛋糕", //类别
    price: "20", //售价
    qgp: 7, //保质期
  },
  {
    id: 107,
    name: "草莓大福",
    category: "大福", //类别
    price: "8", //售价
    qgp: 2, //保质期
  },
  {
    id: 108,
    name: "蓝莓大福",
    category: "大福", //类别
    price: "8", //售价
    qgp: 2, //保质期
  },
  {
    id: 109,
    name: "榴莲大福",
    category: "大福", //类别
    price: "8", //售价
    qgp: 2, //保质期
  },
  {
    id: 110,
    name: "树莓大福",
    category: "大福", //类别
    price: "8", //售价
    qgp: 2, //保质期
  },
  {
    id: 111,
    name: "芒果大福",
    category: "大福", //类别
    price: "8", //售价
    qgp: 2, //保质期
  },
  {
    id: 112,
    name: "香蕉大福",
    category: "大福", //类别
    price: "8", //售价
    qgp: 2, //保质期
  },
];
//转换并存值
// localStorage.setItem("food", JSON.stringify(food));

//原材料仓库
let rawMaterial = [
  {
    id: 101,
    name: "草莓蛋糕原材料",
    number: 58,
    supplier: "浙江忆北食品贸易有限公司",
    bid: 10, //进价
  },
  {
    id: 102,
    name: "蓝莓蛋糕原材料",
    number: 58,
    supplier: "浙江忆北食品贸易有限公司",
    bid: 10, //进价
  },
  {
    id: 103,
    name: "榴莲蛋糕原材料",
    number: 58,
    supplier: "浙江忆北食品贸易有限公司",
    bid: 10, //进价
  },
  {
    id: 104,
    name: "树莓蛋糕原材料",
    number: 58,
    supplier: "浙江忆北食品贸易有限公司",
    bid: 10, //进价
  },
  {
    id: 105,
    name: "香蕉蛋糕原材料",
    number: 58,
    supplier: "浙江忆北食品贸易有限公司",
    bid: 10, //进价
  },
  {
    id: 106,
    name: "芒果蛋糕原材料",
    number: 58,
    supplier: "浙江忆北食品贸易有限公司",
    bid: 10, //进价
  },
  {
    id: 107,
    name: "草莓大福原材料",
    number: 58,
    supplier: "浙江忆北食品贸易有限公司",
    bid: 3, //进价
  },
  {
    id: 108,
    name: "蓝莓大福原材料",
    number: 58,
    supplier: "浙江忆北食品贸易有限公司",
    bid: 3, //进价
  },
  {
    id: 109,
    name: "榴莲大福原材料",
    number: 58,
    supplier: "浙江忆北食品贸易有限公司",
    bid: 3, //进价
  },
  {
    id: 110,
    name: "树莓大福原材料",
    number: 58,
    supplier: "浙江忆北食品贸易有限公司",
    bid: 3, //进价
  },
  {
    id: 111,
    name: "芒果大福原材料",
    number: 58,
    supplier: "浙江忆北食品贸易有限公司",
    bid: 3, //进价
  },
  {
    id: 112,
    name: "香蕉大福原材料",
    number: 58,
    supplier: "浙江忆北食品贸易有限公司",
    bid: 3, //进价
  },
];
//转换并存值
// localStorage.setItem("rawMaterial", JSON.stringify(rawMaterial));

//原材料进货历史
let rawMaterialHistory = [
  [
    {
      id: 101, //原材料的id
      number: 20, //进货数
      time: "2022-01-01 8:00",
    },
    {
      id: 104, //原材料的id
      number: 20, //进货数
      time: "2022-01-01 8:00",
    },
    {
      id: 106, //原材料的id
      number: 20, //进货数
      time: "2022-01-01 8:00",
    },
    {
      id: 111, //原材料的id
      number: 20, //进货数
      time: "2022-01-01 8:00",
    },
  ],
  [
    {
      id: 101, //原材料的id
      number: 20, //进货数
      time: "2022-02-01 8:00",
    },
    {
      id: 104, //原材料的id
      number: 20, //进货数
      time: "2022-02-01 8:00",
    },
    {
      id: 106, //原材料的id
      number: 20, //进货数
      time: "2022-02-01 8:00",
    },
    {
      id: 111, //原材料的id
      number: 20, //进货数
      time: "2022-02-01 8:00",
    },
  ],
  [
    {
      id: 101, //原材料的id
      number: 20, //进货数
      time: "2022-03-01 8:00",
    },
    {
      id: 104, //原材料的id
      number: 20, //进货数
      time: "2022-04-01 8:00",
    },
    {
      id: 106, //原材料的id
      number: 20, //进货数
      time: "2022-05-01 8:00",
    },
    {
      id: 111, //原材料的id
      number: 20, //进货数
      time: "2022-06-01 8:00",
    },
  ],
  [
    {
      id: 101, //原材料的id
      number: 20, //进货数
      time: "2022-04-01 8:00",
    },
    {
      id: 104, //原材料的id
      number: 20, //进货数
      time: "2022-04-01 8:00",
    },
    {
      id: 106, //原材料的id
      number: 20, //进货数
      time: "2022-04-01 8:00",
    },
    {
      id: 111, //原材料的id
      number: 20, //进货数
      time: "2022-04-01 8:00",
    },
  ],
];
//转换并存值
// localStorage.setItem("rawMaterialHistory", JSON.stringify(rawMaterialHistory));
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>

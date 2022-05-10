<template>
  <!-- top -->
  <div class="top"></div>

  <p style="margin-top: -20px">欢迎进入</p>
  <div class="title">公告</div>
  <div class="cont" v-for="(item, index) in lists" :key="index">
    <div class="listTiele">
      <div>{{ item.notice_title }}</div>
      <div style="color: #909399">{{ item.notice_time }}</div>
    </div>

    <p class="content">{{ item.notice_content }}</p>
  </div>

  <!-- 分页 -->
  <Paging :tablePage="tablePage" @changePageNum="changePageNum" />
</template>

<script>
import SearchAndAdd from "@/components/content/searchAndAdd/SearchAndAdd.vue";
import Paging from "@/components/common/paging/Paging.vue";

export default {
  name: "公告主页",
  components: {
    SearchAndAdd,
    Paging,
  },
  data() {
    return {
      list: [],
      lists: [],
      nowPagNum: 1, //当前显示页面
    };
  },
  created() {
    this.$axios({
      url: "announcement",
      method: "get",
    }).then((res) => {
      this.list = res.data.data;
      this.lists = this.list.slice(
        (this.nowPagNum - 1) * 4,
        4 * this.nowPagNum
      );
    });
  },
  methods: {
    //页面改变时触发
    changePageNum(num) {
      this.nowPagNum = num;
      this.lists = this.list.slice(
        (this.nowPagNum - 1) * 4,
        4 * this.nowPagNum
      );
    },
  },
  computed: {
    //传给分页的参
    tablePage() {
      let lists = {
        pageSize: 4, // 每页多少条
        total: null, // 总记录数
      };
      lists.total = this.list.length;

      return lists;
    },
  },
};
</script>

<style scoped>
.top {
  width: 100%;
  height: 70px;
  border-bottom: 2px solid #000000a7;
  margin-bottom: 40px;
}

p {
  font-size: 20px;
}

.title {
  width: calc(100% - 30px);
  height: 60px;
  background-color: rgba(223, 223, 223, 0.242);
  line-height: 60px;
  padding-left: 20px;
  margin-top: 20px;
}

.cont {
  border-bottom: 1px solid #c8c9cc;
  padding: 23px 20px 10px 10px;
  margin-right: 10px;
}

.listTiele {
  display: flex;
}

.listTiele > :nth-child(1) {
  flex: 1;
}

.content {
  color: #c8c9cc;
  font-size: 15px;
  padding-top: 10px;
}
</style>

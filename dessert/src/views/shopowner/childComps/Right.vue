<template>
  <!-- top -->
  <div class="topBox">
    <div class="top"></div>
    <el-input v-model="input" placeholder="请输入宿舍号" />
    <el-button type="primary">搜索</el-button>
    <el-button type="primary">重置</el-button>
    <el-button type="success" plain @click="ShowAdd = true">添加宿舍</el-button>
    <div style="height: 50px"></div>
  </div>

  <!-- 公告主页 -->
  <TheAnnouncementPage v-show="$store.state.showLeftNum == 0" />
  <!-- 宿舍管理 -->
  <DormitoryManagement
    v-show="$store.state.showLeftNum == 1"
    :tableDatas="tableDatas"
  />
  <!-- 学生管理 -->
  <StudentManagement v-show="$store.state.showLeftNum == 2" />
  <!-- 公告管理 -->
  <AnnouncementOfTheManagement v-show="$store.state.showLeftNum == 3" />
  <!-- 管理员管理 -->
  <AdministratorManagement v-show="$store.state.showLeftNum == 4" />

  <!-- 添加框 -->
  <el-dialog v-model="ShowAdd" title="添加宿舍信息">
    <el-form :model="form" label-width="120px">
      <el-form-item label="宿舍名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="宿舍初始水电费">
        <el-input v-model="form.name2" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="ShowAdd = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 分页 -->
  <div class="page">
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="tablePage.pageNum"
      :page-size="tablePage.pageSize"
      :page-sizes="pageSizes"
      :total="tablePage.total"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script>
import Paging from "@/components/common/paging/Paging.vue";

import TheAnnouncementPage from "./TheAnnouncementPage.vue";
import DormitoryManagement from "./DormitoryManagement.vue";
import StudentManagement from "./StudentManagement.vue";
import AnnouncementOfTheManagement from "./AnnouncementOfTheManagement.vue";
import AdministratorManagement from "./AdministratorManagement.vue";

export default {
  components: {
    Paging,
    TheAnnouncementPage,
    DormitoryManagement,
    StudentManagement,
    AnnouncementOfTheManagement,
    AdministratorManagement,
  },
  data() {
    return {
      tableData: [],
      tableDatas: [],
      tablePage: {
        pageNum: 1, // 第几页
        pageSize: 5, // 每页多少条
        total: null, // 总记录数
      },
      pageSizes: [10, 20, 30],
      //添加宿舍信息
      form: {
        name: "",
        name2: "",
        num: "",
      },
      ShowAdd: false, //是否显示添加界面
    };
  },
  watch: {
    // 实时更新页面数
    tableData: function (newVal) {
      this.tablePage.total = newVal.length;
    },
  },
  methods: {
    handlePageChange(currentPage) {
      this.tablePage.pageNum = currentPage;
      // 在此刷新数据
      //请求宿舍分页
      this.$axios({
        url: "/paging",
        method: "get",
        params: {
          pageNum: this.tablePage.pageNum,
        },
      }).then((res) => {
        this.tableDatas = res.data.data;
      });
    },
    handleSizeChange(pageSize) {
      this.tablePage.pageSize = pageSize;
      // 在此刷新数据
    },
  },
  created() {
    //请求第一页数据
    this.handlePageChange(1);
    //请求宿舍管理的数据
    this.$axios({
      url: "/dormitoryManagement",
      method: "get",
    }).then((res) => {
      this.tableData = res.data.data;
    });
  },
};
</script>

<style scoped>
.topBox:deep(.el-input) {
  width: 250px;
  height: 35px;
  margin-right: 15px;
}

.top {
  width: 100%;
  height: 70px;
  border-bottom: 2px solid #000000a7;
  margin-bottom: 40px;
}

.page {
  position: absolute;
  bottom: 20px;
  width: 1100px;
  height: 50px;
}

.page:deep(.el-pagination) {
  justify-content: center;
}
</style>

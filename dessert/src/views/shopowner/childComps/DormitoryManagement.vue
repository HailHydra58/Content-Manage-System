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

  <!-- 列表展示 -->
  <div class="mainBox">
    <el-table :data="tableDatas" border style="width: 100%">
      <el-table-column prop="dormitory_id" label="宿舍编号" width="200" />
      <el-table-column prop="dormitory_name" label="宿舍名称" width="200" />
      <el-table-column prop="num" label="宿舍人数" width="200" />
      <el-table-column
        prop="dormitory_balance"
        label="宿舍水电费余额(元)"
        width="180"
      />
      <el-table-column prop="balance_state" label="宿舍状态" width="200" />
      <el-table-column prop="zip" label="操作" width="300">
        <el-button type="danger" @click="deleteTheDormitory()">
          删除
        </el-button>
        <el-button type="warning" @click="modifyTheDormitory()">修改</el-button>
        <el-select v-model="value" class="m-2" placeholder="宿舍状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-table-column>
    </el-table>
  </div>

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

  <!-- 修改框 -->
  <el-dialog v-model="ShowChange" title="修改宿舍信息">
    <el-form :model="form" label-width="120px">
      <el-form-item label="宿舍编号">
        <el-input v-model="form.name" :disabled="true" />
      </el-form-item>
      <el-form-item label="宿舍名称">
        <el-input v-model="form.name2" />
      </el-form-item>
      <el-form-item label="宿舍人数">
        <el-input-number
          v-model="form.num2"
          :min="0"
          :max="12"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item label="宿舍水电费余额(元)">
        <el-input-number v-model="form.num" :min="-1000" :max="1000" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="ShowChange = false">取消</el-button>
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
export default {
  name: "宿舍管理",
  data() {
    return {
      ShowAdd: false, //是否显示添加界面
      options: [
        {
          value: "选项1",
          label: "1",
        },
        {
          value: "选项2",
          label: "2",
        },
      ],
      value: "",
      form: {
        name: "",
        name2: "",
        num: "",
      },
      ShowChange: false, //是否显示修改界面
      tableData: [], //宿舍列表总数据
      tableDatas: [], //展示的列表数据
      tablePage: {
        pageNum: 1, // 显示第几页
        pageSize: 5, // 每页多少条
        total: null, // 总记录数
      },
      pageSizes: [10, 20, 30],
    };
  },
  methods: {
    //删除
    deleteTheDormitory(x) {
      ElMessageBox.confirm("确定要删除此宿舍吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ElMessage({
            type: "success",
            message: "已成功删除",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消",
          });
        });
    },
    //修改
    modifyTheDormitory(x) {
      this.ShowChange = true;
    },
    //分页切换
    handlePageChange(currentPage) {
      this.tablePage.pageNum = currentPage;
      //通过slice截取出拿来显示的新数组并覆盖
      this.tableDatas = this.tableData.slice(
        (this.tablePage.pageNum - 1) * 5,
        this.tablePage.pageSize * this.tablePage.pageNum
      );
    },
    //和分页有关具体不明
    handleSizeChange(pageSize) {
      this.tablePage.pageSize = pageSize;
      // 在此刷新数据
    },
  },
  created() {
    //请求宿舍管理的数据
    this.$axios({
      url: "/dormitoryManagement",
      method: "get",
    }).then((res) => {
      this.tableData = res.data.data;
      this.tablePage.total = res.data.data.length;
      //通过slice截取出拿来显示的新数组
      this.tableDatas = this.tableData.slice(
        (this.tablePage.pageNum - 1) * 5,
        this.tablePage.pageSize * this.tablePage.pageNum
      );
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

.mainBox:deep(.el-table__row) {
  height: 60px;
}

.mainBox:deep(.cell) {
  display: flex;
}

.mainBox:deep(.el-input__wrapper) {
  width: 120px;
  margin-left: 15px;
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

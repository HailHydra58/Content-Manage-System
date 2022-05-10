<template>
  <!-- top -->
  <SearchAndAdd
    :addName="`宿舍`"
    @search="search"
    @reset="reset"
    @showAdd="addTheDormitory"
  />

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
        <template #default="scope">
          <el-button type="danger" @click="deleteTheDormitory(scope.row)">
            删除
          </el-button>
          <el-button type="warning" @click="modifyTheDormitory(scope.row)"
            >修改</el-button
          >
          <el-select v-model="value" class="m-2" placeholder="宿舍状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 添加框 -->
  <el-dialog v-model="showAdd" title="添加宿舍信息">
    <el-form :model="form" label-width="120px">
      <el-form-item label="宿舍编号">
        <el-input v-model="form.item" disabled />
      </el-form-item>
      <el-form-item label="宿舍名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="宿舍初始水电费">
        <el-input v-model="form.utilities" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelToAdd">取消</el-button>
        <el-button type="primary" @click="submitToAdd">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 修改框 -->
  <el-dialog v-model="ShowChange" title="修改宿舍信息">
    <el-form :model="form" label-width="120px">
      <el-form-item label="宿舍编号">
        <el-input v-model="form.item" :disabled="true" />
      </el-form-item>
      <el-form-item label="宿舍名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="宿舍人数">
        <el-input-number
          v-model="form.num"
          :min="0"
          :max="12"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item label="宿舍水电费余额(元)">
        <el-input-number v-model="form.utilities" :min="-1000" :max="1000" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelModify">取消</el-button>
        <el-button type="primary" @click="submitModify">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 分页 -->
  <Paging :tablePage="tablePage" @changePageNum="changePageNum" />
</template>

<script>
import SearchAndAdd from "@/components/content/searchAndAdd/SearchAndAdd.vue";
import Paging from "@/components/common/paging/Paging.vue";

export default {
  name: "宿舍管理",
  components: {
    SearchAndAdd,
    Paging,
  },
  data() {
    return {
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
        item: "", //当前添加的宿舍编号
        name: "", //宿舍名
        utilities: "", //水电费
        num: "", //宿舍人数
      }, //(ok)
      ShowChange: false, //是否显示修改界面
      tableData: [], //宿舍列表总数据(ok)
      tableDatas: [], //展示的列表数据(ok)
      nowPageNum: 1, //当前的分页(ok)
      showAdd: false, //是否显示添加界面(ok)
    };
  },
  methods: {
    //请求全部数据
    getDataList() {
      //请求宿舍管理的数据
      this.$axios({
        url: "/dormitoryManagement",
        method: "get",
      }).then((res) => {
        this.tableData = res.data.data;
        //通过slice截取出拿来显示的新数组
        this.tableDatas = this.tableData.slice(
          (this.nowPageNum - 1) * 5,
          5 * this.nowPageNum
        );
      });
    },
    //点击搜索
    search(value) {
      this.$axios({
        url: "/queryTheDormitory",
        method: "get",
        params: {
          value,
        },
      }).then((res) => {
        //判断是否搜到数据
        if (res.data.data) {
          this.tableData = res.data.data;
          //通过slice截取出拿来显示的新数组
          this.tableDatas = this.tableData.slice(
            (this.nowPageNum - 1) * 5,
            5 * this.nowPageNum
          );
        } else {
          this.tableData = [];
          this.tableDatas = [];
        }
      });
    },
    //点击重置
    reset() {
      this.getDataList();
      ElMessage({
        type: "success",
        message: "重置成功",
      });
    },
    //点击添加宿舍
    addTheDormitory() {
      this.form = {};
      //获取添加出来的宿舍编号
      this.form.item =
        this.tableData[this.tableData.length - 1].dormitory_id + 1;
      //显示添加框
      this.showAdd = true;
    },
    //点击取消
    cancelToAdd() {
      this.showAdd = false;
      this.form = {};
      ElMessage({
        type: "info",
        message: "已取消",
      });
    },
    //确认添加
    submitToAdd() {
      this.$axios({
        url: "addTheDormitory",
        method: "post",
        data: {
          dormitory_name: this.form.name,
          dormitory_balance: this.form.utilities,
        },
      }).then((res) => {
        ElMessage({
          type: "success",
          message: res.data.msg,
        });
        this.getDataList();
      });

      this.showAdd = false;
      this.form = {};
    },
    //删除
    deleteTheDormitory(e) {
      if (e.num == 0) {
        ElMessageBox.confirm("确定要删除此宿舍吗?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$axios({
              url: "deleteTheDormitory",
              method: "post",
              data: {
                dormitory_id: e.dormitory_id,
              },
            }).then((res) => {
              this.getDataList();
              ElMessage({
                type: "success",
                message: res.data.msg,
              });
            });
          })
          .catch(() => {
            ElMessage({
              type: "info",
              message: "已取消",
            });
          });
      } else {
        ElMessage.error("宿舍人员尚未清空,无法删除");
      }
    },
    //修改
    modifyTheDormitory(e) {
      this.form.item = e.dormitory_id;
      this.form.name = e.dormitory_name;
      this.form.num = e.num;
      this.form.utilities = e.dormitory_balance;

      this.ShowChange = true;
    },
    //修改取消
    cancelModify() {
      ElMessage({
        type: "info",
        message: "已取消",
      });
      this.ShowChange = false;
    },
    //修改确认
    submitModify() {
      this.$axios({
        url: "modifyTheDormitory",
        method: "post",
        data: {
          dormitory_id: this.form.item,
          dormitory_name: this.form.name,
          dormitory_balance: this.form.utilities,
        },
      }).then((res) => {
        ElMessage({
          type: "success",
          message: res.data.msg,
        });
        this.getDataList();
      });

      this.ShowChange = false;
    },
    //分页切换
    changePageNum(num) {
      this.nowPageNum = num;
      //通过slice截取出拿来显示的新数组并覆盖
      this.tableDatas = this.tableData.slice(
        (this.nowPageNum - 1) * 5,
        5 * this.nowPageNum
      );
    },
  },
  created() {
    // 请求数据
    this.getDataList();
  },
  computed: {
    //传给分页的参
    tablePage() {
      let obj = {
        pageSize: 5, // 每页多少条
        total: null, // 总记录数
      };
      obj.total = this.tableData.length;

      return obj;
    },
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
  text-align: center;
  justify-content: center;
}

.mainBox:deep(.el-input__wrapper) {
  width: 120px;
  margin-left: 15px;
}
</style>

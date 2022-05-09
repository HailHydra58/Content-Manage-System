<template>
  <SearchAndAdd
    :addName="`学生`"
    @search="search"
    @reset="reset"
    @showAdd="showAdds"
  />

  <!-- 列表展示 -->
  <ShowList
    :arr_Prop="arr_Prop"
    :arr_label="arr_label"
    :arr_width="arr_width"
    :tableDatas="tableDatas"
    @delete="fnDelete"
    @change="fnChange"
  >
    <template v-slot:operationRight="{ value }">
      <el-button type="success" @click="showPayTheFees(value.stu_num)">
        查看缴费记录
      </el-button>
    </template>
  </ShowList>

  <!-- 分页 -->
  <Paging :tablePage="tablePage" @changePageNum="changePageNum" />

  <!-- 修改框 -->
  <el-dialog v-model="showChange" title="修改宿舍信息">
    <el-form :model="form" label-width="120px">
      <el-form-item label="学号">
        <el-input v-model="form.stu_num" :disabled="true" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.stu_name" />
      </el-form-item>
      <el-form-item label="学生所属宿舍">
        <el-select v-model="form.stu_dorm_id">
          <el-option v-for="item in tableData_drom" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="宿舍水电费余额(元)">
        <el-input-number
          v-model="form.dormitory_balance"
          :min="-1000"
          :max="1000"
          :disabled="true"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelModify">取消</el-button>
        <el-button type="primary" @click="submitModify">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 添加框 -->
  <el-dialog v-model="showAdd" title="添加学生信息">
    <el-form :model="form" label-width="120px">
      <el-form-item label="学号">
        <el-input v-model="form.stu_num" disabled />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.stu_name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="form.stu_sex" label="男" size="large">男</el-radio>
        <el-radio v-model="form.stu_sex" label="女" size="large">女</el-radio>
      </el-form-item>
      <el-form-item label="初始密码">
        <el-input v-model="form.stu_pwd" disabled />
      </el-form-item>
      <el-form-item label="学生所属宿舍">
        <el-select v-model="form.stu_dorm_id" placeholder="请选择宿舍">
          <el-option v-for="item in tableData_drom" :value="item" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelToAdd">取消</el-button>
        <el-button type="primary" @click="submitToAdd">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 缴费记录框 -->
  <el-dialog v-model="showpayTheFees" title="缴费记录">
    <el-table :data="showpayTheFeesList">
      <el-table-column
        prop="payment_record_money"
        label="缴费金额"
        width="150"
      />
      <el-table-column
        prop="payment_record_time"
        label="缴费时间"
        width="200"
      />
      <el-table-column prop="stu_name" label="缴费人" />
    </el-table>
  </el-dialog>
</template>

<script>
import SearchAndAdd from "@/components/content/searchAndAdd/SearchAndAdd.vue";
import ShowList from "@/components/content/showList/ShowList.vue";
import Paging from "@/components/common/paging/Paging.vue";

export default {
  name: "学生管理",
  components: {
    SearchAndAdd,
    ShowList,
    Paging,
  },
  data() {
    return {
      nowPageNum: 1,
      tableData: [],
      tableDatas: [],
      tableData_drom: [], //不重复的宿舍编号列表
      showChange: false, //是否显示修改界面
      showAdd: false, //是否显示添加界面
      showpayTheFees: false, //是否显示缴费记录页面
      showpayTheFeesList: [], //缴费表
      form: {
        stu_num: null,
        stu_name: null,
        stu_sex: null,
        stu_pwd: "123456",
        stu_dorm_id: null,
        dormitory_balance: null,
      },
      arr_Prop: [
        "stu_num",
        "stu_name",
        "stu_dorm_id",
        "dormitory_balance",
        "balance_state",
      ],
      arr_label: [
        "学号",
        "姓名",
        "学生所属宿舍",
        "宿舍水电费余额(元)",
        "宿舍状态",
      ],
      arr_width: [200, 200, 200, 180, 200],
    };
  },
  methods: {
    //请求全部数据
    getDataList() {
      //请求宿舍管理的数据
      this.$axios({
        url: "stuData",
        method: "get",
      })
        .then((res) => {
          this.tableData = res.data.data;
          //通过slice截取出拿来显示的新数组
          this.tableDatas = this.tableData.slice(
            (this.nowPageNum - 1) * 5,
            5 * this.nowPageNum
          );
        })
        .then(() => {
          let arr = [];
          for (let i = 0; i < this.tableData.length; i++) {
            if (i == 0) {
              const item = this.tableData[i].stu_dorm_id;
              arr.push(item);
            } else {
              const oldItem = this.tableData[i - 1].stu_dorm_id;
              const newItem = this.tableData[i].stu_dorm_id;
              if (newItem != oldItem) {
                arr.push(newItem);
              }
            }
          }
          this.tableData_drom = arr;
        });
    },
    search(value) {
      this.$axios({
        url: "stuSearch",
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
    reset() {
      this.getDataList();
      ElMessage({
        type: "success",
        message: "重置成功",
      });
    },
    //点击添加
    showAdds() {
      this.form = {};
      this.form.stu_pwd = "123456";
      //获取添加出来的宿舍编号
      this.form.stu_num =
        Number(this.tableData[this.tableData.length - 1].stu_num) + 1;
      //显示添加框
      this.showAdd = true;
    },
    //点击取消
    cancelToAdd() {
      this.showAdd = false;
      ElMessage({
        type: "info",
        message: "已取消",
      });
    },
    //确认添加
    submitToAdd() {
      console.log(this.form);
      //这里判断是否没有输入值(但是我懒没写)
      if (true) {
        this.$axios({
          url: "stuAdd",
          method: "post",
          data: {
            stu_num: this.form.stu_num,
            stu_name: this.form.stu_name,
            stu_sex: this.form.stu_sex,
            stu_pwd: this.form.stu_pwd,
            stu_dorm_id: this.form.stu_dorm_id,
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
        this.form.stu_pwd = "123456";
      } else {
        ElMessage.error("信息未填完,无法添加");
      }
    },
    changePageNum(num) {
      this.nowPageNum = num;
      //通过slice截取出拿来显示的新数组并覆盖
      this.tableDatas = this.tableData.slice(
        (this.nowPageNum - 1) * 5,
        5 * this.nowPageNum
      );
    },
    //删除触发
    fnDelete(data) {
      ElMessageBox.confirm("确定要删除此学生吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios({
            url: "/stuDelete",
            method: "post",
            data: {
              stu_num: data.stu_num,
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
    },
    //修改触发
    fnChange(data) {
      this.form.stu_num = data.stu_num;
      this.form.stu_name = data.stu_name;
      this.form.stu_dorm_id = data.stu_dorm_id;
      this.form.dormitory_balance = data.dormitory_balance;

      this.showChange = true;
    },
    //修改取消
    cancelModify() {
      ElMessage({
        type: "info",
        message: "已取消",
      });
      this.showChange = false;
    },
    //修改确认
    submitModify() {
      this.$axios({
        url: "/stuChange",
        method: "post",
        data: {
          stu_num: this.form.stu_num,
          stu_name: this.form.stu_name,
          stu_dorm_id: this.form.stu_dorm_id,
        },
      }).then((res) => {
        ElMessage({
          type: "success",
          message: res.data.msg,
        });
        this.getDataList();
      });

      this.showChange = false;
    },
    //查看缴费记录
    showPayTheFees(value) {
      this.$axios({
        url: "/payTheFees",
        method: "get",
        params: {
          stu_num: value,
        },
      }).then((res) => {
        this.showpayTheFeesList = res.data.data;
      });

      //显示缴费框
      this.showpayTheFees = true;
    },
  },
  created() {
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

<style scoped></style>

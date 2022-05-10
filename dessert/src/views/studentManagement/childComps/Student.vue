<template>
  <SearchAndAdd
    :addName="`学生`"
    :isDisabled="true"
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
    :isShowAdd="false"
    :isShowUpdate="false"
  >
    <template v-slot:operationRight="{ value }">
      <el-button type="success" @click="showPayTheFees(value.stu_num)">
        查看缴费记录
      </el-button>
      <el-button type="success" @click="topUp(value)">充值</el-button>
    </template>
  </ShowList>

  <!-- 分页 -->
  <Paging :tablePage="tablePage" @changePageNum="changePageNum" />

  <!-- 充值框 -->
  <el-dialog v-model="showTopUp" title="充值">
    <el-form :model="form" label-width="120px">
      <el-form-item label="充值金额">
        <el-input
          v-model="showTopUpMoney"
          placeholder="仅支持数值类型,单位(元)"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="canceltopUp">取消</el-button>
        <el-button type="primary" @click="submittopUp">确定</el-button>
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
      showpayTheFees: false, //是否显示缴费记录页面
      showpayTheFeesList: [], //缴费表
      showTopUp: false, //是否显示充值表
      showTopUpMoney: null, //充值的钱
      stu_dorm_id: null, //当前所属的宿舍
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
        params: {
          stu_id: this.$store.state.loginStuId,
        },
      }).then((res) => {
        this.tableData = res.data.data;
        //通过slice截取出拿来显示的新数组
        this.tableDatas = this.tableData.slice(
          (this.nowPageNum - 1) * 5,
          5 * this.nowPageNum
        );
      });
    },
    changePageNum(num) {
      this.nowPageNum = num;
      //通过slice截取出拿来显示的新数组并覆盖
      this.tableDatas = this.tableData.slice(
        (this.nowPageNum - 1) * 5,
        5 * this.nowPageNum
      );
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
    //充值触发
    topUp(value) {
      this.showTopUpMoney = null;
      this.oldMoney = value.dormitory_balance;
      this.stu_dorm_id = value.stu_dorm_id;
      this.showTopUp = true;
    },
    //充值取消
    canceltopUp() {
      ElMessage({
        type: "info",
        message: "已取消",
      });
      this.showTopUp = false;
    },
    //充值确认
    submittopUp() {
      this.$axios({
        url: "/topUp",
        method: "post",
        data: {
          topUp: this.showTopUpMoney,
          stu_dorm_id: this.stu_dorm_id,
          oldMoney: this.oldMoney,
        },
      }).then((res) => {
        ElMessage({
          type: "success",
          message: res.data.msg,
        });
        this.getDataList();
      });

      this.showTopUp = false;
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

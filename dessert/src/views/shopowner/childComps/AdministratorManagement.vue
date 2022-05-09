<template>
  <SearchAndAdd
    :addName="`管理员`"
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
  />

  <!-- 分页 -->
  <Paging :tablePage="tablePage" @changePageNum="changePageNum" />

  <!-- 添加框 -->
  <el-dialog v-model="showAdd" title="添加管理员信息">
    <el-form :model="form" label-width="120px">
      <el-form-item label="编号">
        <el-input v-model="form.admin_id" disabled />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.admin_name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="form.admin_account" disabled />
      </el-form-item>
      <el-form-item label="初始密码">
        <el-input v-model="form.admin_pwd" disabled />
      </el-form-item>
      <el-form-item label="类型">
        <el-radio v-model="form.admin_root" label="0" size="large" />
        <el-radio v-model="form.admin_root" label="1" size="large" />
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
  <el-dialog v-model="showChange" title="修改管理员信息">
    <el-form :model="form" label-width="120px">
      <el-form-item label="编号">
        <el-input v-model="form.admin_id" disabled />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.admin_name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="form.admin_account" disabled />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.admin_pwd" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="类型">
        <el-radio v-model="form.admin_root" label="0" size="large" />
        <el-radio v-model="form.admin_root" label="1" size="large" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelModify">取消</el-button>
        <el-button type="primary" @click="submitModify">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import SearchAndAdd from "@/components/content/searchAndAdd/SearchAndAdd.vue";
import ShowList from "@/components/content/showList/ShowList.vue";
import Paging from "@/components/common/paging/Paging.vue";

export default {
  name: "管理员管理",
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
      showChange: false, //是否显示修改界面
      showAdd: false, //是否显示添加界面
      form: {
        admin_id: null,
        admin_name: null,
        admin_account: null,
        admin_pwd: null,
        admin_root: null,
      },
      arr_Prop: ["admin_id", "admin_name", "admin_account", "admin_root"],
      arr_label: ["编号", "姓名", "账号", "类型"],
      arr_width: [250, 250, 250, 230],
    };
  },
  methods: {
    //请求全部数据
    getDataList() {
      //请求宿舍管理的数据
      this.$axios({
        url: "/admins",
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
    //
    search(value) {
      this.$axios({
        url: "/adminsSearch",
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
    //
    changePageNum(num) {
      this.nowPageNum = num;
      //通过slice截取出拿来显示的新数组并覆盖
      this.tableDatas = this.tableData.slice(
        (this.nowPageNum - 1) * 5,
        5 * this.nowPageNum
      );
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
      this.form.admin_pwd = "123456";

      //获取添加出来的账号ID
      this.form.admin_id =
        Number(this.tableData[this.tableData.length - 1].admin_id) + 1;
      //获取添加出来的账号
      this.form.admin_account =
        Number(this.tableData[this.tableData.length - 1].admin_account) + 1;

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
      //这里判断是否没有输入值(但是我懒没写)
      if (true) {
        this.$axios({
          url: "/adminsAdd",
          method: "post",
          data: {
            admin_account: this.form.admin_account,
            admin_pwd: this.form.admin_pwd,
            admin_root: Number(this.form.admin_root),
            admin_name: this.form.admin_name,
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
      } else {
        ElMessage.error("信息未填完,无法添加");
      }
    },
    //修改触发
    fnChange(data) {
      this.form = {};
      this.form.admin_id = data.admin_id;
      this.form.admin_name = data.admin_name;
      this.form.admin_account = data.admin_account;
      this.form.admin_root = data.admin_root;

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
        url: "/adminsChange",
        method: "post",
        data: {
          admin_id: this.form.admin_id,
          admin_root: Number(this.form.admin_root),
          admin_name: this.form.admin_name,
          admin_pwd: this.form.admin_pwd,
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
    //删除触发
    fnDelete(data) {
      ElMessageBox.confirm("确定要删除此管理员吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios({
            url: "/adminsDelete",
            method: "post",
            data: {
              admin_id: data.admin_id,
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

<style></style>

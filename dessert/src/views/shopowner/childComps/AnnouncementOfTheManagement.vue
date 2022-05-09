<template>
  <SearchAndAdd
    :addName="`公告`"
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

  <!-- 修改框 -->
  <el-dialog v-model="showChange" title="修改宿舍信息">
    <el-form :model="form" label-width="120px">
      <el-form-item label="公告编号">
        <el-input v-model="form.notice_id" disabled />
      </el-form-item>
      <el-form-item label="公告标题">
        <el-input v-model="form.notice_title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="公告内容">
        <el-input
          v-model="form.notice_content"
          autosize
          type="textarea"
          placeholder="请输入公告内容"
        />
      </el-form-item>
      <el-form-item label="发布时间">
        <el-input v-model="form.notice_time" disabled />
      </el-form-item>
      <el-form-item label="发布人">
        <el-input v-model="$store.state.loginUser" disabled />
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
      <el-form-item label="公告编号">
        <el-input v-model="form.notice_id" disabled />
      </el-form-item>
      <el-form-item label="公告标题">
        <el-input v-model="form.notice_title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="公告内容">
        <el-input
          v-model="form.notice_content"
          autosize
          type="textarea"
          placeholder="请输入公告内容"
        />
      </el-form-item>
      <el-form-item label="发布时间">
        <el-input v-model="form.notice_time" disabled />
      </el-form-item>
      <el-form-item label="发布人">
        <el-input v-model="notice_admin_name" disabled />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelToAdd">取消</el-button>
        <el-button type="primary" @click="submitToAdd">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import SearchAndAdd from "@/components/content/searchAndAdd/SearchAndAdd.vue";
import ShowList from "@/components/content/showList/ShowList.vue";
import Paging from "@/components/common/paging/Paging.vue";

export default {
  name: "公告管理",
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
        notice_id: null,
        notice_title: null,
        notice_content: null,
        notice_time: null,
        notice_admin_name: null,
      },
      arr_Prop: [
        "notice_id",
        "notice_title",
        "notice_content",
        "notice_time",
        "notice_admin_id",
      ],
      arr_label: ["公告编号", "公告标题", "公告内容", "发布时间", "发布人"],
      arr_width: [100, 200, 500, 100, 80],
    };
  },
  methods: {
    //请求全部数据
    getDataList() {
      //请求宿舍管理的数据
      this.$axios({
        url: "/notice",
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
        url: "noticeSearch",
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
      this.notice_admin_name = this.$store.state.loginUser;
      this.getNowTime();

      //获取添加出来的宿舍编号
      this.form.notice_id =
        Number(this.tableData[this.tableData.length - 1].notice_id) + 1;
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
          url: "noticeAdd",
          method: "post",
          data: {
            notice_title: this.form.notice_title,
            notice_content: this.form.notice_content,
            notice_time: this.form.notice_time,
            notice_admin_id: this.$store.state.loginRoot,
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
    //
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
            url: "/noticeDelete",
            method: "post",
            data: {
              notice_id: data.notice_id,
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
      this.form.notice_id = data.notice_id;
      this.form.notice_title = data.notice_title;
      this.form.notice_content = data.notice_content;
      this.form.notice_time = data.notice_time;

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
        url: "/noticeChange",
        method: "post",
        data: {
          notice_id: this.form.notice_id,
          notice_title: this.form.notice_title,
          notice_content: this.form.notice_content,
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
    //获取当前时间
    getNowTime() {
      //获取当前时间并打印
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      _this.gettime = yy + "." + mm + "." + dd;
      this.form.notice_time = _this.gettime;
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

<template>
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
</template>

<script>
export default {
  name: "宿舍管理",
  props: {
    tableDatas: {
      type: Array,
      default() {
        return [];
      },
    },
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
        name: "",
        name2: "",
        num: "",
      },
      ShowChange: false, //是否显示修改界面
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
  },
};
</script>

<style scoped>
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
</style>

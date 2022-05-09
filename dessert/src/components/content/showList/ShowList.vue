<template>
  <div class="mainBox">
    <el-table :data="tableDatas" border style="width: 100%">
      <el-table-column
        v-for="(item, index) in arr_Prop"
        :key="index"
        :prop="item"
        :label="arr_label[index]"
        :width="arr_width[index]"
      />

      <el-table-column prop="zip" label="操作" width="300">
        <template #default="scope">
          <el-button type="danger" @click="deleteTheDormitory(scope.row)">
            删除
          </el-button>
          <el-button type="warning" @click="modifyTheDormitory(scope.row)">
            修改
          </el-button>
          <slot name="operationRight" :value="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["tableDatas", "arr_Prop", "arr_label", "arr_width"],
  methods: {
    deleteTheDormitory(data) {
      this.$emit("delete", data);
    },
    modifyTheDormitory(data) {
      this.$emit("change", data);
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
  text-align: center;
  justify-content: center;
}

.mainBox:deep(.el-input__wrapper) {
  width: 120px;
  margin-left: 15px;
}
</style>

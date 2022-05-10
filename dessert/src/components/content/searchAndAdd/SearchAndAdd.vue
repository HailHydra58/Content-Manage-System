<template>
  <div class="topBox">
    <div class="top"></div>
    <el-input v-model="input" placeholder="请输入" @keydown.enter="search" />
    <el-button type="primary" @click="search" :disabled="isDisabled"
      >搜索</el-button
    >
    <el-button type="primary" @click="reset" :disabled="isDisabled"
      >重置</el-button
    >
    <el-button type="success" plain @click="add" :disabled="isDisabled">
      添加{{ addName }}
    </el-button>
    <div style="height: 50px"></div>
  </div>
</template>

<script>
export default {
  props: {
    addName: {
      type: String,
      default: "",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      input: "",
    };
  },
  methods: {
    search() {
      this.$emit("search", this.input);
    },
    reset() {
      this.$emit("reset");
      this.input = "";
    },
    add() {
      this.$emit("showAdd");
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
</style>

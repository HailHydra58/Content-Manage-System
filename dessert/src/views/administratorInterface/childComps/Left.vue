<template>
  <ul class="ul">
    <li
      :class="{ liColor: $store.state.showLeftNum == index }"
      v-for="(item, index) in list"
      @click="clickItem(index)"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      list: ["公告主页", "宿舍管理", "学生管理", "公告管理", "管理员管理"],
    };
  },
  methods: {
    clickItem(index) {
      this.$store.state.showLeftNum = index;
    },
  },
};
</script>

<style scoped>
.ul {
  display: flex;
  list-style: none;
  flex-direction: column; /* 向下排列 */
  width: auto;
  height: 40%;
  font-size: 16px;
  font-weight: 400;
  margin-right: 30px;
}
.ul > li {
  flex: 1;
  display: flex;
  flex-direction: column; /* 项目从上到下垂直显示 */
  justify-content: center; /* 垂直居中 */
  padding-left: 40px;
}

.ul > li:hover {
  background-color: rgba(204, 204, 204, 0.144);
  cursor: pointer;
}

.liColor {
  background-color: rgba(204, 204, 204, 0.477);
}
</style>

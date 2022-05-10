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
  props: ["list"],
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
  height: calc(100vh - 78px);
  font-size: 16px;
  font-weight: 400;
  margin-right: 30px;
}
.ul > li {
  /* flex: 1; */
  height: 50px;
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

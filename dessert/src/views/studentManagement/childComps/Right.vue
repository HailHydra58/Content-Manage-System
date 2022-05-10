<template>
  <!-- 公告主页 -->
  <TheAnnouncementPage v-if="$store.state.showLeftNum == 0" />
  <!-- 学生管理 -->
  <Student v-if="$store.state.showLeftNum == 1" />
</template>

<script>
import TheAnnouncementPage from "@/components/content/theAnnouncementPage/TheAnnouncementPage.vue";

import Student from "./Student.vue";

export default {
  components: {
    TheAnnouncementPage,
    Student,
  },
};
</script>

<style></style>

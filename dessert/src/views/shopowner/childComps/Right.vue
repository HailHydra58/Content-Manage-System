<template>
  <!-- 公告主页 -->
  <TheAnnouncementPage v-if="$store.state.showLeftNum == 0" />
  <!-- 宿舍管理 -->
  <DormitoryManagement v-if="$store.state.showLeftNum == 1" />
  <!-- 学生管理 -->
  <StudentManagement v-if="$store.state.showLeftNum == 2" />
  <!-- 公告管理 -->
  <AnnouncementOfTheManagement v-if="$store.state.showLeftNum == 3" />
  <!-- 管理员管理 -->
  <AdministratorManagement v-if="$store.state.showLeftNum == 4" />
</template>

<script>
import Paging from "@/components/common/paging/Paging.vue";

import TheAnnouncementPage from "./TheAnnouncementPage.vue";
import DormitoryManagement from "./DormitoryManagement.vue";
import StudentManagement from "./StudentManagement.vue";
import AnnouncementOfTheManagement from "./AnnouncementOfTheManagement.vue";
import AdministratorManagement from "./AdministratorManagement.vue";

export default {
  components: {
    Paging,
    TheAnnouncementPage,
    DormitoryManagement,
    StudentManagement,
    AnnouncementOfTheManagement,
    AdministratorManagement,
  },
};
</script>

<style scoped></style>

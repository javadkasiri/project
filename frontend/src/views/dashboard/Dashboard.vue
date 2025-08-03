<template>
  <div class="dashboard-layout">
    <SidebarMenu />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import SidebarMenu from "@/components/layout/SidebarMenu.vue";

export default {
  name: "DashboardLayout",
  components: {
    SidebarMenu,
  },
};
</script>


<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.main-content {
  flex: 1;
  padding: 30px;
  background-color: #f5f5f5;
  box-sizing: border-box;
}
</style>

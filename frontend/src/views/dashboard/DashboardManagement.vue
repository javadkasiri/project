<template>
  <div class="management">
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="{ active: currentTab === tab }"
        @click="currentTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <div class="tab-content">
      <ManagementWall v-if="currentTab === 'Wall'" />
      <ManagementEvent v-if="currentTab === 'Event'" />
      <ManagementProblems v-if="currentTab === 'Problems'" />
      <ManagementReports v-if="currentTab === 'Reports'" />
      <ManagementStaff v-if="currentTab === 'Staff'" />
    </div>
  </div>
</template>



<script>
import ManagementWall from "@/components/management/ManagementWall.vue"
import ManagementEvent from "@/components/management/ManagementEvent.vue"
import ManagementProblems from "@/components/management/management-problems/ManagementProblems.vue"
import ManagementReports from "@/components/management/ManagementReports.vue"
import ManagementStaff from "@/components/management/ManagementStaff.vue"

export default {  
  components: {
    ManagementWall,
    ManagementEvent,
    ManagementProblems,
    ManagementReports,
    ManagementStaff
  },
  data() {
    return {
      tabs: ['Wall', 'Event', 'Problems', 'Reports', 'Staff'],
      currentTab: 'Wall'
    };
  }
}
</script>

<style scoped>
.management {
  padding: 20px;
}

.tabs {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tabs button {
  background: none;
  border: none;
  padding: 10px 30px;
  font-weight: bold;
  cursor: pointer;
  color: #555;
  border-bottom: 2px solid transparent;
  transition: 0.3s;
    font-size: 15px;
}

.tabs button.active {
  color: black;
  border-color: #087944;
}

.tab-content {
  background: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  margin: 0 !important;
}
</style>

<template>
  <div class="workspace">
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
      <WorkspaceTrigger v-if="currentTab === 'Trigger'" />
      <WorkspaceBanner v-if="currentTab === 'Banner'" />
    </div>
  </div>
</template>

<script>
import WorkspaceTrigger from "@/components/workspace/WorkspaceTrigger.vue";
import WorkspaceBanner from "@/components/workspace/WorkspaceBanner.vue";

export default {
  components: {
    WorkspaceTrigger,
    WorkspaceBanner,
  },
  data() {
    return {
      tabs: ["Trigger", "Banner"],
      currentTab: "Trigger",
    };
  },
};
</script>

<style scoped>
.workspace {
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

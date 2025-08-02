<template>
  <div class="problem-list">
    <div v-if="isModal" class="modal-close" @click="$emit('close')">×</div>

    <div class="problem-header">
      <div>Customer ID</div>
      <div>Title</div>
      <div>Description</div>
      <div>Created By</div>
      <div>Created At</div>
      <div>Status</div>
      <div>Actions</div>
      <div>Response</div>
    </div>

    <div class="problem-items">
      <ProblemListItem
        v-for="problem in problems"
        :key="problem._id"
        :problem="problem"
        @update-problem="handleUpdatedProblem"
      />
    </div>
  </div>
</template>

<script>
import ProblemListItem from "./ProblemListItem.vue";

export default {
  components: { ProblemListItem },
  props: {
    customerId: {
      type: String,
      default: null,
    },
    isModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      problems: [],
    };
  },
  async mounted() {
    const filter = this.customerId ? { customerId: this.customerId } : {};

    const res = await fetch("http://localhost:3000/api/dumdb/vueapp/problems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "get", filter }),
    });

    const json = await res.json();
    this.problems = json.result || [];
  },
  methods: {
  handleUpdatedProblem(updatedProblem) {
    const index = this.problems.findIndex(p => p._id === updatedProblem._id);
    if (index !== -1) {
      // آپدیت اطلاعات در آرایه
      this.problems[index] = updatedProblem;
    }
  }
}

};
</script>

<style scoped>
.problem-list {
  width: 100%;
  min-width: 1200px;
  max-width: 100%;
  background: #fff;
  border-radius: 10px;
  overflow: visible;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: auto;
}
.modal-close {
  position: absolute;
  top: -10px;
  right: 2px;
  font-size: 24px;
  font-weight: bold;
  color: #888;
  cursor: pointer;
  z-index: 10;
  transition: 0.2s;
}
.modal-close:hover {
  color: #e74c3c;
}
.problem-header {
  display: grid;
  grid-template-columns:
    1fr /* Customer ID */
    1fr /* Title */
    3fr /* Description */
    1fr /* Created By */
    1.2fr /* Created At */
    0.8fr /* Status */
    0.8fr /* Actions */
    0.8fr; /* Response */
  font-weight: bold;
  color: #666;
  padding: 10px 10px 10px 5px;
  border-bottom: 2px solid #eee;
  text-align: center;
}

.problem-header div {
  padding: 10px 8px;
  box-sizing: border-box;
}
.problem-items {
  max-height: 630px; /* ارتفاع دلخواه */
  overflow-y: auto;
}
.problem-items::-webkit-scrollbar {
  width: 4px;
}

.problem-items::-webkit-scrollbar-track {
  background: transparent;
}

.problem-items::-webkit-scrollbar-thumb {
  background-color: #999;
  border-radius: 4px;
}
</style>

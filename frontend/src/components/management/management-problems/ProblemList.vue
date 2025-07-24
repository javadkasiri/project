<template>
  <div class="problem-list">
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

    <ProblemListItem
      v-for="problem in problems"
      :key="problem._id"
      :problem="problem"
    />
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
};
</script>

<style scoped>
.problem-list {
  width: 100%;
  background: #fff;
  border-radius: 10px;
  padding: 0px;
}

.problem-header {
  display: grid;
 grid-template-columns:
    1fr     /* Customer ID */
    1fr     /* Title */
    3fr     /* Description */
    1fr     /* Created By */
    1.2fr   /* Created At */
    0.8fr   /* Status */
    0.8fr   /* Actions */
    0.8fr;  /* Response */  font-weight: bold;
  color: #666;
  padding: 10px 10px 10px 5px;
  border-bottom: 2px solid #eee;
  text-align: center;
}

.problem-header div {
  padding: 10px 8px;
  box-sizing: border-box;
}
</style>

<template>
  <div class="columns-container">
    <div v-for="item in problems" :key="item._id" class="column-box">
      <span><strong>email:</strong> {{ item.email }}</span>
      <span><strong>Chat ID:</strong> {{ item.chat_id }}</span>
      <span><strong>Message:</strong> {{ item.problem_msg }}</span>
      <span><strong>Status:</strong> {{ item.status }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const problems = ref([]);

onMounted(async () => {
  const res = await fetch("http://localhost:3000/api/dumdb/vueapp/problems", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "get",
    }),
  });
  const data = await res.json();
  problems.value = Array.isArray(data.result) ? data.result : [];
});
</script>

<style scoped>
.columns-container {
  max-height: 600px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 16px;
}

.column-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.05);
}
</style>

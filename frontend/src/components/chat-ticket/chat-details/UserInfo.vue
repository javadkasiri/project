<template>
  <div class="user-info">
    <div class="avatar">
      <span class="material-symbols-outlined">person</span>
    </div>

    <div class="name">{{ sender }}</div>
    <div class="customerId">{{ customerId }}</div>

    <div class="actions">
      <span class="material-symbols-outlined" title="Ticket">mail</span>
      <span class="material-symbols-outlined" title="Chat">chat</span>
      <span class="material-symbols-outlined" title="Call">call</span>
    </div>

    <div class="buttons">
      <a :href="problemsUrl" target="_blank" class="button">Problems</a>
      <a :href="addProblemUrl" target="_blank" class="button">Add Problem</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    customerId: String,
    sender: String,
  },
  computed: {
  problemsUrl() {
    return `/management/problems/${this.customerId}`;
  },
  addProblemUrl() {
    return `/management/add-problem/${this.customerId}`;
  }
}

};
</script>

<style scoped>
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 16px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin: 10px 15px 15px;
  min-width: 210px;
  max-width: 210px;
}

.avatar {
  width: 60px;
  height: 60px;
  background-color: #ddd;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}

.name {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 4px;
}

.customerId {
  font-size: 14px;
  color: #777;
  margin-bottom: 16px;
}

.actions {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.actions .material-symbols-outlined {
  font-size: 24px;
  color: #555;
  cursor: pointer;
}
.avatar .material-symbols-outlined {
  font-size: 30px; /* یا هر عدد دلخواه */
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.button {
  text-align: center;
  background-color: #f2f6fc;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  color: #2196f3;
  font-weight: 500;
  transition: background-color 0.2s;
  text-decoration: none;
}

.button:hover {
  background-color: #e3f2fd;
}
</style>

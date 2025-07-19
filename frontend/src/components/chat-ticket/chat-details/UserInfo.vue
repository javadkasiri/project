<template>
  <div class="user-info">
    <div class="avatar">
      <span class="material-symbols-outlined">person</span>
    </div>

    <div class="name">{{ sender }}</div>
    <div class="customerId">{{ customerId }}</div>

    <div class="actions">
      <span class="material-symbols-outlined">mail</span>
      <span class="material-symbols-outlined">chat</span>
      <span class="material-symbols-outlined">call</span>
    </div>

    <div class="links">
      <div class="link" @click="handleClick('problems')">Problems</div>
      <div class="link" @click="handleClick('add')">Add Problem</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    customerId: String,
    sender: String
  },
  methods: {
    handleClick(action) {
      console.log("Clicked:", action);
      // می‌تونی اینجا route بزنی یا modal باز کنی
    }
  }
};
</script>

<style scoped>
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 16px ;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
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

.links {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.link {
  text-align: center;
  background-color: #f2f6fc;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  color: #2196f3;
  font-weight: 500;
  transition: background-color 0.2s;
}

.link:hover {
  background-color: #e3f2fd;
}
</style>

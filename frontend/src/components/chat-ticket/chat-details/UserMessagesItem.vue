<template>
  <div class="message-item" :class="{ active: isActive }" @click="selectItem">

    <div class="avatar">
      <span class="material-symbols-outlined">person</span>
    </div>
    <div class="content">
      <div class="top-row">
        <span class="sender">{{ sender }}</span>
        <span class="time">{{ time }}</span>
      </div>
      <div class="text">{{ text }}</div>
    </div>
  </div>
</template> 

<script>
export default {
  props: ['sender', 'text', 'time', 'isActive', 'conversationId'],
  methods: {
    selectItem() {
      this.$emit('select', {
        conversationId: this.conversationId
      });
    }
  }
};
</script>

<style scoped>
.message-item {
  display: flex;
  background-color: #f8f8f8;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  box-sizing: border-box;
  min-width: 251px;
  max-width: 251px;
}

.message-item.active {
  background-color: #e3f2fd; /* هم‌رنگ ChatList */
}

.message-item:hover {
  background-color: #eef1f5;
}

.message-item.active {
  background-color: #e3f2fd;
}

.avatar {
  width: 40px;
  height: 40px;
  background-color: #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-right: 12px;
  flex-shrink: 0;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  min-width: 0;
}

.top-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: bold;
  font-size: 14px;
  color: #2c3e50;
  margin-bottom: 4px;
}

.sender {
  font-weight: bold;
  font-size: 14px;
  color: #2c3e50;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
}

.time {
  font-size: 12px;
  color: #999;
  white-space: nowrap;
  margin-left: 8px;
}

.text {
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
}
</style>

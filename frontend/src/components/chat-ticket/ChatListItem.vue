<template>
  <div class="chat-list-item" @click="selectChat">
    <div class="avatar">
      <span class="material-symbols-outlined">person</span>
    </div>
    <div class="content">
      <div class="top-row">
        <span class="sender">{{ sender }}</span>
        <span class="time">{{ time }}</span>
      </div>
      <div class="last-message">{{ text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['sender', 'senderId', 'text', 'time'],
  methods: {
    selectChat() {
      this.$emit('select', this.senderId);
    }
  }
};
</script>


<style scoped>
.chat-list-item {
  display: flex;
  background-color: #f8f8f8;
  padding: 12px 16px;
  margin-bottom: 6px;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.chat-list-item:hover {
  background-color: #eef1f5;
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
.last-message {
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
  font-size: 24px;
}
</style>

<template>
  <div :class="['chat-bubble', side]">
    <div class="avatar-circle">
      <span class="material-symbols-outlined avatar-icon">
        {{ iconName }}
      </span>
    </div>

    <div :class="['bubble-content', side]">
      <div class="sender-time">
        <span class="sender">{{ sender }}</span>
        <span class="time">{{ time }}</span>
      </div>
      <div class="text">{{ text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["sender", "text", "time", "side"],
  computed: {
    iconName() {
      return this.side === "right" ? "headset_mic" : "person";
    },
  },
};
</script>

<style scoped>
.chat-bubble {
  display: flex;
  align-items: flex-end;
  margin: 8px 0;
  width: 100%;
}

.chat-bubble.left {
  justify-content: flex-start;
  flex-direction: row;
  text-align: left;
}

.chat-bubble.right {
  flex-direction: row-reverse;
  justify-content: flex-start;
  text-align: right;
}
.avatar-circle {
  background-color: #e5e7eb;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px;
}

.avatar-icon {
  font-size: 22px;
  color: #333;
}

.bubble-content {
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  min-width: 120px;
  word-break: break-word;
}

.bubble-content.left {
  background-color: #3b82f6;
  color: white;
}

.bubble-content.right {
  background-color: #f1f1f1;
  color: #333;
}

.sender-time {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 4px;
}

.sender {
  font-weight: bold;
}

.time {
  color: #bbb;
}
</style>

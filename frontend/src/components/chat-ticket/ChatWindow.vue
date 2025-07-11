<template>
  <div class="chat-window">
    <div class="messages-container">
      <ChatMessages />
    </div>
    <div class="input-container">
      <ChatInput />
    </div>
  </div>
</template>
<script>
import ChatMessages from "./chat-window/ChatMessages.vue";
import ChatInput from "./chat-window/ChatInput.vue";

export default {
  name: "ChatWindow",
  components: {
    ChatMessages,
    ChatInput,
  },
};
</script>

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;

  display: flex;
  flex-direction: column; /* ✅ ترتیب درست نگه داشته میشه */
  justify-content: flex-end; /* ✅ پیام‌ها به پایین چسبیده */
}

.input-container {
  flex-shrink: 0;
}
</style>

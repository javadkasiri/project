<template>
  <div class="messages">
    <ChatBubble
      v-for="msg in messages"
      :key="msg._id"
      :sender="msg.sender"
      :text="msg.text"
      :time="msg.time"
      :side="msg.side"
    />
  </div>
</template>

<script>
import ChatBubble from "./ChatBubble.vue";

export default {
  components: { ChatBubble },
  data() {
    return {
      messages: [],
    };
  },
  async mounted() {
    try {
      const response = await fetch("http://localhost:3000/api/dumdb/vueapp/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "get",
          filter: {},
        }),
      });

      const result = await response.json();
      this.messages = result.result;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  },
};
</script>

<style scoped>
.messages {
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow-y: auto;
  height: 100%;
  scroll-behavior: smooth;
  
}
.messages::-webkit-scrollbar {
  width: 4px; 
}

.messages::-webkit-scrollbar-track {
  background: transparent; 
}

.messages::-webkit-scrollbar-thumb {
  background-color: #999; 
  border-radius: 4px;
}


</style>

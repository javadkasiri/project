<template>
  <div class="chat-list-wrapper">
    <div class="header">Chat List</div>
    <div class="chat-list" ref="chatListContainer">
<ChatListItem
  v-for="item in latestCustomerChats"
  :key="item.customerId + '_' + item.conversationId"
  :sender="item.sender"
  :customerId="item.customerId"
  :agentId="item.agentId"
  :conversationId="item.conversationId"
  :text="item.text"
  :time="item.time"
  :isActive="item.conversationId === selectedConversationId"
  @select="handleSelect"
/>
    </div>
  </div>
</template>

<script>
import ChatListItem from "./ChatListItem.vue";

export default {
  components: { ChatListItem },
  props: ['selectedConversationId'],
  data() {
    return {
      chats: [],
      activeConversationId: null, 
    };
  },
  computed: {
    latestCustomerChats() {
      const map = {};
      this.chats.forEach((c) => {
        const key = c.conversationId;
        if (!map[key] || new Date(c.time) > new Date(map[key].time)) {
          map[key] = {
            sender: c.sender,
            customerId: c.senderId.startsWith("customer_")
              ? c.senderId
              : c.receiverId,
            agentId: c.senderId.startsWith("user_") ? c.senderId : c.receiverId,
            text: c.text,
            time: c.time,
            conversationId: c.conversationId,
          };
        }
      });
      return Object.values(map);
    },
  },
  methods: {
    async fetchChats() {
      try {
        console.log("[ChatList] fetching...");
        const res = await fetch("http://localhost:3000/api/dumdb/vueapp/chats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "get", filter: {} }),
        });
        const json = await res.json();
        this.chats = json.result;
        this.scrollToBottom(); // ✅ اسکرول به پایین
      } catch (e) {
        console.error(e);
      }
    },
    handleSelect(payload) {
      this.activeConversationId = payload.conversationId;
      this.$emit("select", payload);
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.chatListContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    }
  },
  mounted() {
    this.fetchChats();
  },
};
</script>

<style scoped>
.chat-list-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
}
.header {
  font-size: 18px;
  font-weight: bold;
  padding: 12px 16px 6px;
  border-bottom: 2px solid #2196f3;
  width: fit-content;
  margin-left: 16px;
  margin-bottom: 12px;
}
.chat-list {
  overflow-y: auto;
  max-height: 100%;
}

.chat-list::-webkit-scrollbar {
  width: 4px;
}
.chat-list::-webkit-scrollbar-track {
  background: transparent;
}
.chat-list::-webkit-scrollbar-thumb {
  background-color: #999;
  border-radius: 4px;
}
</style>

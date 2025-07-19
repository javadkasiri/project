<template>
  <div class="user-messages-box">
    <div class="header">History</div>
    <div class="user-messages" ref="messagesContainer">
      <p v-if="userMessages.length === 0">No chat found</p>
  <UserMessagesItem
  v-for="msg in userMessages"
  :key="msg._id"
  :sender="msg.sender"
  :text="msg.text"
  :time="msg.time"
  :conversationId="msg.conversationId"
  :isActive="msg.conversationId === selectedConversationId"
  @select="handleSelect"
/>
    </div>
  </div>
</template>

<script>
import UserMessagesItem from "./UserMessagesItem.vue";

export default {
  name: "UserMessages",
  components: { UserMessagesItem },
  props: ["customerId", "selectedConversationId"],
  data() {
    return {
      userMessages: [],
      activeConversationId: null
    };
  },
  watch: {
    customerId(newVal) {
      if (newVal) this.fetchUserMessages();
    },
  },
  mounted() {
    if (this.customerId) this.fetchUserMessages();
  },
  methods: {
  async fetchUserMessages() {
    try {
      const res = await fetch("http://localhost:3000/api/dumdb/vueapp/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "get",
          filter: { senderId: this.customerId }
        }),
      });

      const json = await res.json();
      const chats = json.result || [];

      const map = {};
      chats.forEach(chat => {
        const cid = chat.conversationId;
        if (!map[cid] || new Date(chat.time) > new Date(map[cid].time)) {
          map[cid] = chat;
        }
      });

      this.userMessages = Object.values(map).sort((a, b) => new Date(b.time) - new Date(a.time));
      this.scrollToBottom(); // 👈 اضافه شد
    } catch (err) {
      console.error("[UserMessages] Error fetching messages:", err);
    }
  },

  scrollToBottom() {
    this.$nextTick(() => {
      const container = this.$refs.messagesContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    });
  },

  handleSelect({ conversationId }) {
    this.activeConversationId = conversationId;
    this.$emit("select-conversation", conversationId);
  }
}

};
</script>



<style scoped>
.user-messages-box {
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

.user-messages {
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
  max-height: 375px;
  display: flex;
  flex-direction: column;
  padding: 0 12px;
  width: 100%;
  max-width: 100%;
  
}


.user-messages::-webkit-scrollbar {
  width: 4px;
}
.user-messages::-webkit-scrollbar-track {
  background: transparent;
}
.user-messages::-webkit-scrollbar-thumb {
  background-color: #999;
  border-radius: 4px;
}
</style>

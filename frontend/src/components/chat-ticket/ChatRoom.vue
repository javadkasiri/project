<template>
  <div class="chat-room">
    <div class="chat-list">
      <ChatList @select="handleSelectUser" />
    </div>
    <div class="chat-window">
      <ChatWindow
        v-if="selectedCustomerId && selectedAgentId"
        :customerId="selectedCustomerId"
        :agentId="selectedAgentId"
      />
      <div v-else class="placeholder">No chat has been selected from the list</div>
    </div>
    <div class="chat-details">
      <ChatDetails />
    </div>
  </div>
</template>

<script>
import ChatList from "./ChatList.vue";
import ChatWindow from "./ChatWindow.vue";
import ChatDetails from "./ChatDetails.vue";

export default {
  components: { ChatList, ChatWindow, ChatDetails },
  data() {
    return {
      selectedCustomerId: null,
      selectedAgentId: null,
    };
  },
  methods: {
    handleSelectUser({ customerId, agentId }) {
      this.selectedCustomerId = customerId;
      this.selectedAgentId = agentId;
      console.log('[ChatRoom] selected:', customerId, agentId);
    },
  },
};
</script>

<style scoped>
.chat-room { display: flex; height: 92%; margin:5px; overflow:hidden; }
.chat-list { width:20%; background:#fff; padding:12px; overflow-y:auto; }
.chat-window { flex:1; background:#f0f2f5; position:relative; }
.placeholder { color:#999; text-align:center; margin-top:50px; }
.chat-details { width:20%; background:#fff; padding:20px; }
</style>


<style scoped>
.chat-room {
  display: flex;
  height: calc(92%); /* حذف چسبندگی پایین */
  margin: 5px;
  background-color: #f0f2f5;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
  border-radius: 12px;
  overflow: hidden;
}
/* Sidebar */
.chat-list {
  width: 20%;
  background: #ffffff;
  padding: 12px;
  overflow-y: auto;
}

/* Chat content */
.chat-window {
  flex: 1;
  height: 100%;
  padding: 0;
  margin: 0;
}

/* Details panel */
.chat-details {
  width: 20%;
  background: #ffffff;
  padding: 20px;
}
</style>

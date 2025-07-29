<template>
  <div class="chat-room">
    <div class="chat-list">
      <ChatList
        :selectedConversationId="selectedConversationId"
        @select="handleSelectUser"
      />
    </div>
    <div class="chat-window">
      <ChatWindow
        v-if="selectedConversationId"
        :customerId="selectedCustomerId"
        :agentId="selectedAgentId"
        :conversationId="selectedConversationId"
        :draft="draftMessages[selectedConversationId] || ''"
        @update-draft="handleUpdateDraft"
      />
      <div v-else class="placeholder">
        No chat has been selected from the list
      </div>
    </div>
    <div class="chat-details">
      <ChatDetails
        v-if="selectedCustomerId"
        :customerId="selectedCustomerId"
        :agentId="selectedAgentId"
        :sender="selectedSender"
        :conversationId="selectedConversationId"
        :formResetKey="formResetKey"
        @select-conversation="selectedConversationId = $event"
      />
    </div>
  </div>
</template>

<script>
import ChatList from "./Chat-List/ChatList.vue";
import ChatWindow from "./chat-window/ChatWindow.vue";
import ChatDetails from "./chat-details/ChatDetails.vue";

export default {
  components: { ChatList, ChatWindow, ChatDetails },
  data() {
    return {
      selectedCustomerId: null,
      selectedAgentId: null,
      selectedSender: "",
      selectedConversationId: null,
      formResetKey: 0,
      draftMessages: {},
    };
  },
  methods: {
    handleSelectUser({ customerId, agentId, sender, conversationId }) {
      this.selectedCustomerId = customerId;
      this.selectedAgentId = agentId;
      this.selectedSender = sender;
      this.selectedConversationId = conversationId;
      this.formResetKey++;
    },
    handleUpdateDraft({ conversationId, message }) {
this.draftMessages[conversationId] = message;
    },
  },
};
</script>

<style scoped>
.chat-room {
  display: flex;
  height: 92%;
  margin: 5px;
  overflow: hidden;
}
.chat-list {
  width: 20%;
  background: #fff;
  padding: 12px;
  overflow-y: auto;
}
.chat-window {
  flex: 1;
  background: #f0f2f5;
  position: relative;
}
.placeholder {
  color: #999;
  text-align: center;
  margin-top: 50px;
}
.chat-details {
  width: 20%;
  background: #fff;
  padding: 20px;
}
</style>

<style scoped>
.chat-room {
  display: flex;
  height: calc(93%); /* حذف چسبندگی پایین */
  margin: 0px;
  background-color: #f0f2f5;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
  overflow: hidden;
}
/* Sidebar */
.chat-list {
  width: 20%;
  background: #ffffff;
  overflow-y: auto;
  padding-top: 8px;
  padding-right: 0;
  padding-left: 0;
  padding-bottom: 8px;
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
  padding: 0;
  margin: 0;
}
</style>

<template>
  <div class="chat-details">
    <div class="half-box">
      <UserInfo :customerId="customerId" :sender="sender" />
    </div>
    <div class="half-box">
      <UserMessages
        :customerId="customerId"
        :selectedConversationId="conversationId"
        @select-conversation="handleConversationSelect"
      />
    </div>
  </div>
</template>

<script>
import UserInfo from "./UserInfo.vue";
import UserMessages from "./UserMessages.vue";

export default {
  components: {
    UserInfo,
    UserMessages,
  },
  props: {
    customerId: String,
    agentId: String,
    sender: String,
    conversationId: String,
  },
  data() {
  return {
    activeConversationId: null
  };
},
methods: {
  handleConversationSelect(cid) {
    this.activeConversationId = cid;
    this.$emit("select-conversation", cid); // به ChatRoom منتقل میشه
  }
}
};
</script>

<style scoped>
.chat-details {
  flex-direction: column;
  box-sizing: border-box;
}

.half-box {
  width: 100%;
  display: flex;
}
</style>

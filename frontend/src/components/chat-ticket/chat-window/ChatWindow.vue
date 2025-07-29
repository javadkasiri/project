<template>
  <div class="chat-window">
    <ChatMessages
      :customerId="customerId"
      :agentId="agentId"
      :conversationId="conversationId"
    />
    <ChatInput :draft="draft" @update-draft="handleUpdateDraft" />
  </div>
</template>

<script>
import ChatMessages from "./ChatMessages.vue";
import ChatInput from "./ChatInput.vue";

export default {
  components: { ChatMessages, ChatInput },
  props: {
    customerId: String,
    agentId: String,
    conversationId: String,
    draft: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleUpdateDraft(message) {
      this.$emit("update-draft", {
        conversationId: this.conversationId,
        message,
      });
    },
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
  overflow-y: scroll;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.input-container {
  flex-shrink: 0;
}
</style>

<template>
  <div class="chat-list">
    <ChatListItem
      v-for="chat in latestCustomerChats"
      :key="chat.senderId"
      :sender="chat.sender"
      :senderId="chat.senderId"
      :text="chat.text"
      :time="chat.time"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import ChatListItem from './ChatListItem.vue';

export default {
  components: { ChatListItem },
  data() {
    return {
      chats: []
    };
  },
  computed: {
    latestCustomerChats() {
      const lastMessages = {};
      this.chats.forEach(chat => {
        if (chat.senderId?.startsWith('customer_')) {
          lastMessages[chat.senderId] = chat;
        }
      });
      return Object.values(lastMessages);
    }
  },
  methods: {
    async fetchChats() {
      try {
        const response = await fetch('http://localhost:3000/api/dumdb/vueapp/chats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'get',
            filter: {}
          })
        });

        const result = await response.json();
        this.chats = result.result;
      } catch (error) {
        console.error('[ChatList] Failed to fetch chats:', error);
      }
    },
    handleSelect(senderId) {
      this.$emit('chat-selected', senderId);
    }
  },
  mounted() {
    this.fetchChats();
  }
};
</script>


<style scoped>
.chat-list {
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  max-height: 100%;
  min-width: 100%;
}
</style>

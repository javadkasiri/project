<template>
  <div class="chat-list-wrapper">
    <div class="header">Chat List</div>
    <div class="chat-list">
<ChatListItem
  v-for="item in latestCustomerChats"
  :key="item.customerId"
  :sender="item.sender"
  :customerId="item.customerId"
  :agentId="item.agentId"
  :text="item.text"
  :time="item.time"
  :isActive="item.customerId === activeCustomerId"
  @select="handleSelect"
/>
    </div>
  </div>
</template>

<script>
import ChatListItem from "./ChatListItem.vue";

export default {
  components: { ChatListItem },
data() {
  return {
    chats: [],
    activeCustomerId: null, // ← آیتم انتخاب‌شده
  };
},
  computed: {
    latestCustomerChats() {
      const map = {};
      this.chats.forEach(c => {
        if (c.senderId.startsWith('customer_')) {
          map[c.senderId] = {
            sender: c.sender,
            customerId: c.senderId,
            agentId: c.receiverId,
            text: c.text,
            time: c.time
          };
        }
      });
      return Object.values(map);
    }
  },
  methods: {
    async fetchChats() {
      try {
        console.log('[ChatList] fetching...');
        const res = await fetch("http://localhost:3000/api/dumdb/vueapp/chats", {
          method: "POST", headers: { 'Content-Type':'application/json' },
          body: JSON.stringify({ action:'get', filter:{} })
        });
        const json = await res.json();
        this.chats = json.result;
      } catch(e) { console.error(e); }
    },
    handleSelect(payload) {
  this.activeCustomerId = payload.customerId; // ← فعال‌سازی آیتم
  this.$emit("select", payload);
}
  },
  mounted() { this.fetchChats(); }
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
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
  max-height: 100%;
  min-width: 100%;

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

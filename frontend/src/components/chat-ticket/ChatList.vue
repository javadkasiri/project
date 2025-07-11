<template>
  <div class="chat-list">
    <ChatListItem
      v-for="item in latestCustomerChats"
      :key="item.customerId"
      :sender="item.sender"
      :customerId="item.customerId"
      :agentId="item.agentId"
      :text="item.text"
      :time="item.time"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import ChatListItem from "./ChatListItem.vue";

export default {
  components: { ChatListItem },
  data() {
    return { chats: [] };
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
      this.$emit("select", payload);
    }
  },
  mounted() { this.fetchChats(); }
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

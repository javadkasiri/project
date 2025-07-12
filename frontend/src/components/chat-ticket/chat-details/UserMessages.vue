<template>
  <div class="user-messages-wrapper">
    <div class="header">History</div>
    <div class="user-messages">
      <p v-if="userMessages.length === 0">No chat found</p>
      <UserMessagesItem
        v-for="msg in userMessages"
        :key="msg._id"
        :sender="msg.sender"
        :text="msg.text"
        :time="msg.time"
      />
    </div>
  </div>
</template>

<script>
import UserMessagesItem from "./UserMessagesItem.vue";

export default {
  name: "UserMessages",
  components: { UserMessagesItem },
  props: ['customerId'],
  data() {
    return {
      userMessages: []
    };
  },
  watch: {
    customerId(newVal) {
      console.log("[UserMessages] customerId changed:", newVal);
      this.fetchUserMessages();
    }
  },
  mounted() {
    console.log("[UserMessages] mounted with customerId:", this.customerId);
    this.fetchUserMessages();
  },
  methods: {
    async fetchUserMessages() {
      if (!this.customerId) {
        console.warn("[UserMessages] No customerId provided.");
        return;
      }

      console.log("[UserMessages] Fetching messages for:", this.customerId);
      try {
        const res = await fetch("http://localhost:3000/api/dumdb/vueapp/chats", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: "get",
            filter: { senderId: this.customerId }
          })
        });

        const data = await res.json();
        console.log("[UserMessages] API response:", data);

        this.userMessages = data.result || [];
      } catch (err) {
        console.error("[UserMessages] Error fetching messages:", err);
      }
    }
  }
};
</script>


<style scoped>
.user-messages-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 260px;
  max-width: 400px;
  background-color: #fff;
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
  overflow-y: auto;
  padding: 0 16px;
}

.avatar {
  width: 40px;
  height: 40px;
  background-color: #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-right: 12px;
  flex-shrink: 0;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  min-width: 0;
}

.top-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: bold;
  font-size: 14px;
  color: #2c3e50;
  margin-bottom: 4px;
}

.sender {
  font-weight: bold;
  font-size: 14px;
  color: #2c3e50;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
}

.time {
  font-size: 12px;
  color: #999;
  white-space: nowrap;
  margin-left: 8px;
}

.last-message {
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

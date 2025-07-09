<template>
  <div class="chat-room">
    <div class="chat-list">
      <ChatList @select="handleSelectUser" />
    </div>
    <div class="chat-window">
      <ChatWindow :userId="selectedUserId" />
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
  name: "ChatRoom",
  components: {
    ChatList,
    ChatWindow,
    ChatDetails,
  },
};
</script>

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

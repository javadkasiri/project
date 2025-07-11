<template>
  <div class="chat-details">
    <div class="half-box">
      <ChatUserInfo />
    </div>
    <div class="half-box">
      <ChatUserMessages />
    </div>
  </div>
</template>

<script>
import ChatUserInfo from "./chat-details/ChatUserInfo.vue";
import ChatUserMessages from "./chat-details/ChatUserMessages.vue";

export default {
  components: {
    ChatUserInfo,
    ChatUserMessages,
  },
};
</script>

<style scoped>
.chat-details {
  display: flex;
  flex-direction: column;
  justify-content: center; /* عمودی وسط */
  align-items: center;     /* افقی وسط */
  height: 100%;
  gap: 15px;
  padding: 30px;
  box-sizing: border-box;
}

.half-box {
  width: 100%;
  display: flex;
  justify-content: flex-start; /* بچه بیاد سمت چپ */
  padding-right: 30px;         /* فاصله از راست */
}

.half-box > * {
  display: flex;
  justify-content: center;
}
</style>


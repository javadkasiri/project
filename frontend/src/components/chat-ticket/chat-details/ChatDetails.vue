<template>
  <div class="chat-details">
    <div class="half-box">
      <UserInfo :customerId="customerId" :sender="sender" />
    </div>
    <div class="half-box">
<UserMessages :customerId="customerId" :conversationId="conversationId" />
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
  conversationId: String
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


<template>
  <div class="chat-details">
    <div class="half-box">
      <UserInfo />
    </div>
    <div class="half-box">
      <UserMessages />
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
  justify-content: flex-start; 
  padding-right: 30px;         
}

.half-box > * {
  display: flex;
  justify-content: center;
}
</style>


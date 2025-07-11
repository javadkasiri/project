<template>
  <div class="card-box">
    <h4>User Info</h4>
    <p>This panel contains user-related information like name, email, etc.</p>
  </div>
</template>

<script>
export default {
  name: "ChatUserInfo",
};
</script>

<style scoped>
.card-box {
  width: 100%;
  min-width: 260px;   
  max-width: 400px;  
  min-height: 400px; 
  max-height: 500px; 
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #ccc;
  background: #fff;
  box-sizing: border-box;
  word-wrap: break-word;
}
</style>

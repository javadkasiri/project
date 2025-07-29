<template>
    <div class="setting-card">
      <button class="close-btn" @click="$emit('close')">✖</button>
      <h3>Update Account Settings</h3>
      <form @submit.prevent="saveSettings">
        <div class="form-group">
          <label for="email">New email</label>
          <input
            type="text"
            id="email"
            v-model="email"
            placeholder="Enter new email"
          />
        </div>

        <div class="form-group">
          <label for="password">New Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter new password"
          />
        </div>

        <button class="submit-button" type="submit">Save</button>
      </form>
    </div>
</template>

<script>
export default {
  name: "DashboardSetting",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    saveSettings() {
      if (!this.email || !this.password) {
        alert("Please fill out both fields.");
        return;
      }

      // در مرحله بعد می‌تونی اینو به سرور بفرستی
      alert(`Saved:\nemail: ${this.email}\nPassword: ${this.password}`);
    },
  },
};
</script>

<style scoped>
.setting-card {
  position: relative; /* برای اینکه close-btn درست کار کنه */
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  min-width: 500px;
  max-width: 500px;
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

h3 {
  color: #087944;
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.submit-button {
  background-color: #087944;
  color: white;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;  
  margin-top: 10px;
}

.submit-button:hover {
  background-color: #0a7141;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 15px;
  color: #888;
  cursor: pointer;
}

.close-btn:hover {
  color: #e74c3c;
}
</style>

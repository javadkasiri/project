<template>
  <nav class="navbar">
    <!-- لوگو سمت چپ -->
    <div class="left">
      <a @click.prevent="goToDashboard" class="logo" style="cursor: pointer">
        <img src="@/assets/logo.png" alt="Logo" class="logo-img" />
      </a>
    </div>

    <!-- محتوای بالا فقط برای کاربر لاگین‌شده -->
    <template v-if="isLoggedIn">
      <UserTopbar />
    </template>

    <!-- دکمه‌های مهمان -->
    <template v-else>
      <div class="guest-buttons">
        <router-link to="/signup" class="btn-signup">Signup</router-link>
        <router-link to="/login" class="btn-login">Login</router-link>
      </div>
    </template>
  </nav>
</template>

<script>
import { auth } from "../utils/auth";
import UserTopbar from "@/components/UserTopbar.vue";

export default {
  name: "AppNavbar",
  components: {
    UserTopbar,
  },
  computed: {
    isLoggedIn() {
      return auth.isLoggedIn;
    },
  },
  methods: {
    goToDashboard() {
      const token = localStorage.getItem("token");
      this.$router.push(token ? "/dashboard" : "/");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

.navbar {
  display: flex;
  justify-content: space-between;
  height: 64px;
  align-items: center;
  background-color: #f4f7fe;
  padding: 10px 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
  gap: 20px;
  box-shadow: none !important;
  border-bottom: none !important;
}

.left {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 32px;
  width: auto;
  display: block;
  margin-right: 10px;
}

.btn-signup,
.btn-login {
  padding: 8px 24px;
  border: 1.5px solid #1565c0;
  border-radius: 20px;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 14px;
}

.btn-signup {
  background-color: white;
  color: #1565c0;
}
.btn-signup:hover {
  background-color: #1565c0;
  color: white;
}

.btn-login {
  background-color: #1565c0;
  color: white;
}
.btn-login:hover {
  background-color: #0d47a1;
  border-color: #0d47a1;
}

.guest-buttons {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>

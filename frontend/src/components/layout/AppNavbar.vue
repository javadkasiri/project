<template>
  <nav class="navbar">
    <div class="left">
      <a @click.prevent="goToDashboard" class="logo" style="cursor: pointer">
        <img src="@/assets/logo.png" alt="Logo" class="logo-img" />
      </a>
    </div>

    <div class="right">
      <!-- وقتی لاگین نیست -->
      <template v-if="!isLoggedIn">
        <router-link to="/signup">Signup</router-link>
        <router-link to="/login">Login</router-link>
      </template>

      <!-- وقتی لاگین هست -->
      <template v-else>
        <span @click="showProfile = true" class="nav-link">Profile</span>
        <span @click="showSettings = true" class="nav-link">Settings</span>
      </template>
    </div>

    <!-- پاپ‌آپ پروفایل -->
    <div v-if="showProfile" class="popup" @click.self="closeProfilePopup">
      <UserProfile @close="closeProfilePopup" />
    </div>
    <!-- پاپ‌آپ تنظیمات -->
    <div v-if="showSettings" class="popup" @click.self="closeSettingsPopup">
      <UserSetting @close="closeSettingsPopup" />
    </div>
  </nav>
</template>

<script>
import { auth } from "../../utils/auth";
import UserProfile from "@/components/layout/modals/UserProfile.vue";
import UserSetting from "@/components/layout/modals/UserSetting.vue";

export default {
  name: "AppNavbar",
  components: { UserProfile, UserSetting },
  data() {
    return {
      showProfile: false,
      showSettings: false,
    };
  },
  computed: {
    isLoggedIn() {
      return auth.isLoggedIn;
    },
  },
  methods: {
    goToDashboard() {
      if (localStorage.getItem("token")) {
        this.$router.push("/dashboard");
      } else {
        this.$router.push("/");
      }
    },
    closeProfilePopup() {
      this.showProfile = false;
    },
    closeSettingsPopup() {
      this.showSettings = false;
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 15px 30px;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.left a,
.right a {
  margin: 0 10px;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

.left {
  display: flex;
  align-items: center;
}

.right {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 32px;
  width: auto;
  display: block;
  margin-right: 10px;
}
.nav-link {
  margin: 0 10px;
  font-weight: bold;
  color: #2c3e50;
  cursor: pointer;
}

.nav-link:hover {
  color: #42b983;
}
.popup {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.4);
}
</style>

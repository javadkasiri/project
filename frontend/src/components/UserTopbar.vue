<template>
  <div class="topbar">
    <!-- جستجو -->
    <div class="search-container">
      <span class="material-icons search-icon">search</span>
      <input type="text" placeholder="Search" />
    </div>

    <!-- خروج از حساب -->
    <button class="icon-button logout-button" @click="logout">
      <span class="material-icons">power_settings_new</span>
    </button>

    <!-- اعلان با badge -->
    <div class="notification-wrapper">
      <button class="icon-button" @click="$emit('notification-click')">
        <span class="material-icons">notifications_none</span>
        <span v-if="hasNotifications" class="notification-badge"></span>
      </button>
    </div>

    <!-- صدا -->
    <button class="icon-button" @click="toggleVolume">
      <span class="material-icons">{{
        isMuted ? "volume_off" : "volume_up"
      }}</span>
    </button>

    <!-- حالت شب -->
    <button class="icon-button" @click="$emit('toggle-dark')">
      <span class="material-icons">dark_mode</span>
    </button>

    <!-- تنظیمات -->
    <router-link to="/dashboard/settings" class="icon-button">
      <span class="material-icons">settings</span>
    </router-link>

    <!-- آیکون حساب کاربری -->
    <router-link to="/dashboard/profile" class="icon-button">
      <span class="material-icons account-icon">account_circle</span>
    </router-link>
  </div>
</template>

<script>
import { auth } from "@/utils/auth";

export default {
  name: "UserTopbar",
  props: {
    hasNotifications: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    async logout() {
      try {
        const res = await fetch("http://localhost:3000/api/logout", {
          method: "POST",
          credentials: "include",
        });
        localStorage.removeItem("token");
        auth.isLoggedIn = false;
        if (res.ok) {
          this.$router.push("/login");
        } else {
          console.error("Logout failed");
        }
      } catch (err) {
        console.error("Logout error:", err);
      }
    },
  },
};
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: white;
  padding: 8px 16px;
  border-radius: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  width: fit-content;
  max-width: 100%;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #f4f7fe;
  padding: 6px 12px;
  border-radius: 30px;
  flex: none;
  width: 220px;
  max-width: 300px;
}

.search-container input {
  border: none;
  outline: none;
  background: transparent;
  padding-left: 6px;
  font-size: 14px;
  width: 100%;
}

.search-icon {
  font-size: 20px;
  color: #9ca3af;
}

.icon-button {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.icon-button .material-icons {
  font-size: 22px;
  color: #2d53da;
  transition: color 0.2s ease;
}

.icon-button:hover .material-icons {
  color: #2544b3;
}

.notification-wrapper {
  position: relative;
  display: flex;
}

.notification-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
  border: 1px solid white;
}

/* آیکون حساب کاربری بزرگ‌تر و گرد */
.account-icon {
  font-size: 32px;
}

.logout-button .material-icons {
  color: #2d53da;
  transition: color 0.2s ease;
}

.logout-button:hover .material-icons {
  color: #e53935; /* قرمز */
}
</style>

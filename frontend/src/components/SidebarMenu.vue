<template>
  <aside class="sidebar" :class="{ collapsed: isCollapsed }">
    <!-- لوگو + فلش -->
    <div class="logo-area">
      <router-link to="/dashboard" class="logo-link">
        <img src="@/assets/logo.png" alt="Logo" />
        <span v-if="!isCollapsed" class="logo-text">CNP ONE</span>
      </router-link>
      <button class="toggle-btn" @click="toggleSidebar">
        <span class="material-icons">
          {{ isCollapsed ? "chevron_right" : "chevron_left" }}
        </span>
      </button>
    </div>

    <!-- منو -->
    <nav class="menu">
      <div class="menu-inner">
        <router-link to="/dashboard/management" class="menu-item">
          <div class="icon-wrapper">
            <span class="material-icons">dashboard</span>
          </div>
          <span class="item-label" :class="{ hidden: isCollapsed }"
            >Management</span
          >
          <span v-if="isCollapsed" class="tooltip-text">Management</span>
        </router-link>

        <router-link to="/dashboard/chat-ticket" class="menu-item">
          <div class="icon-wrapper">
            <span class="material-icons">forum</span>
          </div>
          <span class="item-label" :class="{ hidden: isCollapsed }"
            >Chat / Ticket</span
          >
          <span v-if="isCollapsed" class="tooltip-text">Chat / Ticket</span>
        </router-link>

        <router-link to="/dashboard/call-center" class="menu-item">
          <div class="icon-wrapper">
            <span class="material-icons">call</span>
          </div>
          <span class="item-label" :class="{ hidden: isCollapsed }"
            >Call Center</span
          >
          <span v-if="isCollapsed" class="tooltip-text">Call Center</span>
        </router-link>

        <router-link to="/dashboard/marketing" class="menu-item">
          <div class="icon-wrapper">
            <span class="material-icons">trending_up</span>
          </div>
          <span class="item-label" :class="{ hidden: isCollapsed }"
            >Marketing</span
          >
          <span v-if="isCollapsed" class="tooltip-text">Marketing</span>
        </router-link>

        <router-link to="/dashboard/data-grabber" class="menu-item">
          <div class="icon-wrapper">
            <span class="material-icons">cloud_download</span>
          </div>
          <span class="item-label" :class="{ hidden: isCollapsed }"
            >Data Grabber</span
          >
          <span v-if="isCollapsed" class="tooltip-text">Data Grabber</span>
        </router-link>
      </div>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "SidebarMenu",
  data() {
    return {
      isCollapsed: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>

<style scoped>
.sidebar > nav {
  border: none;
  margin: 0;
  padding: 0;
}
.sidebar {
  width: 220px;
  transition: width 0.3s ease;
  height: 100vh;
  background-color: #2d53da;
  padding: 40px 5px 40px 15px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: visible;
}

.sidebar.collapsed {
  width: 70px;
}

.logo-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /*gap: 10px;*/
  margin-left: 10px;
  margin-bottom: 50px;
  position: relative;
  overflow: visible;
  text-decoration: none;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.logo-area img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  color: white;
  white-space: nowrap;
}

.toggle-btn {
  position: absolute;
  right: -60px; /* از منو بیرون بزنه */
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: transparent;
  border: none;
  color: black; /* فلش مشکی */
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

/* حالت hover: دایره سفید، فلش مشکی */
.toggle-btn:hover {
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.menu {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
  background-color: transparent;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  gap: 15px;
  box-sizing: border-box;
  color: white;
  background-color: transparent;
  font-size: 16px;
  border-radius: 12px;
  position: relative;
  text-decoration: none;
}

.menu-inner {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  padding-right: 5px; /* 👈 فاصله از لبه راست */
}

.icon-wrapper {
  width: 24px;
  min-width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar.collapsed .menu-item {
  position: relative;
}

.material-icons {
  min-width: 24px;
  text-align: center;
  font-size: 20px;
}

.menu-item .material-icons {
  font-size: 20px;
  color: white;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
}

.menu-item:hover .material-icons {
  color: white;
}

.menu-item.router-link-active {
  background-color: white;
  color: #0e3168;
  font-weight: bold;
  height: 60px; /* 👈 دقیقاً هم‌ارتفاع با .menu-item */
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 12px;
  overflow: hidden;
}

.menu-item.router-link-active .material-icons {
  color: #2d53da;
}

.item-label {
  width: 100px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  opacity: 1;
  visibility: visible;
  width: auto;
}

.item-label.hidden {
  opacity: 0;
  width: 0;
  padding: 0;
  margin: 0;
  transition: none;
}

.tooltip-text {
  position: absolute;
  left: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
  background-color: #fff;
  color: #0e3168;
  padding: 6px 10px;
  font-size: 13px;
  white-space: nowrap;
  border-radius: 4px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  margin-left: 8px;
  z-index: 9999;
}

/* فقط زمانی که سایدبار جمع شده و موس روی menu-item هست */
.sidebar.collapsed .menu-item:hover .tooltip-text {
  opacity: 1;
}
</style>

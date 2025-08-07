<template>
  <div id="app">
    <AppNavbar />
    <router-view />
  </div>
</template>

<script>
import AppNavbar from './components/layout/AppNavbar.vue'
import { auth } from "@/utils/auth";

export default {
  name: 'App',
  components: {
    AppNavbar
  },
  async mounted() {
    const token = localStorage.getItem("token");
    if (auth.isLoggedIn || token) {
      try {
        const res = await fetch("http://localhost:3000/api/check-session", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!res.ok) {
          // یعنی status 401 یا 403 یا هرچیز غیر از 2xx
          throw new Error("Session invalid");
        }


      } catch (err) {
        console.warn("Session expired or failed:", err);
        auth.isLoggedIn = false;
        localStorage.removeItem("token");
        this.$router.push("/");
      }
    }
  }
}
</script>


<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 20px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 10px;
  text-decoration: none;
}

.dashboard-layout {
  display: flex;
  align-items: stretch; 
}
</style>

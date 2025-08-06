<template>
  <div class="login-wrapper">
    <div class="image-side"></div>
    <div class="login-container">
      <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin" novalidate>
          <!-- فیلد ایمیل -->
          <div class="form-group">
            <label for="email">Your email address</label>
            <input
              type="text"
              id="email"
              v-model="email"
              autocomplete="email"
              required
            />
          </div>

          <!-- فیلد رمز عبور با آیکون داخل input -->
          <div class="form-group">
            <label for="password">Enter password</label>
            <div class="input-with-icon">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                autocomplete="current-password"
                required
              />
              <span
                class="material-icons eye-icon"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? "visibility_off" : "visibility" }}
              </span>
            </div>
          </div>

          <!-- گزینه Keep me logged in و Forgot password جداگانه -->
          <div class="login-options">
            <label class="keep-logged-in">
              <input type="checkbox" v-model="keepLoggedIn" />
              <span>Keep me logged in</span>
            </label>
            <a href="/forgot-password" class="forgot-password"
              >Forgot password?</a
            >
          </div>

          <p v-if="loginError" class="error-message">
            The email or password is incorrect.
          </p>

          <!-- دکمه لاگین -->
          <button type="submit">Login</button>

          <!-- Divider گوگل -->
          <div class="divider-with-text">
            <span>or</span>
          </div>

          <!-- دکمه ورود با گوگل -->
          <button type="button" class="btn-google" @click="handleGoogleLogin">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              class="google-icon"
            />
            <span>Continue with Google</span>
          </button>

          <div class="signup-link">
            Don’t have an account?
            <a href="/signup">Sign up now</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "../utils/auth";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      loginError: false,
      keepLoggedIn: false, // ← اضافه کن
    };
  },
  watch: {
    email() {
      if (this.loginError) this.loginError = false;
    },
    password() {
      if (this.loginError) this.loginError = false;
    },
  },
  methods: {
    async handleLogin() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailValid = emailPattern.test(this.email);
      if (!isEmailValid) {
        this.loginError = true;
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            username: this.email,
            password: this.password,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("token", data.token);
          auth.isLoggedIn = true;
          this.$router.push("/dashboard");
        } else {
          this.loginError = true;
        }
      } catch (err) {
        console.error("Server error:", err);
        this.loginError = true;
      }
    },
    handleGoogleLogin() {
      window.location.href = "http://localhost:3000/api/auth/google";
    },
  },
};
</script>

<style scoped>
.login-wrapper {
  display: flex;
  min-height: 100vh;
}

.image-side {
  flex: 1;
  background-color: #2d53da;
}

.login-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
}

.login-form {
  width: 100%;
  max-width: 500px;
  padding: 50px;
  background-color: #fff;
}

h2 {
  text-align: left;
  font-size: 35px;
  color: #2b3674;
}

.form-group {
  margin-bottom: 25px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  padding-bottom: 3px;
  color: #2b3674;
  font-size: 14px;
  /*font-weight: bold;*/
}

input {
  width: 100%;
  padding: 16px;
  border: 1px solid #b9c1d6;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

/* اختیاری برای افکت زیبا */
input:focus {
  outline: none;
  /*border-color: #869dff;*/
  box-shadow: 0 0 0 1px #333; /* نازک‌تر از قبل */
}

/* مخصوص input رمز عبور با آیکون چشم */
.input-with-icon {
  position: relative;
}

.input-with-icon input {
  width: 100%;
  padding: 16px;
  /*padding-right: 5px;*/ /* فضای کافی برای آیکون */
  border: 1px solid #b9c1d6;
}

input,
button,
.input-with-icon input {
  height: 14px;
  font-size: 15px;
  box-sizing: border-box;
}

.password-wrapper {
  position: relative;
}

.eye-icon {
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #a3aed0;
  font-size: 22px;
}

.eye-icon:hover {
  color: #0e3168;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #2d53da;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background-color: #2544b3;
}

.error-message {
  color: red;
  margin-top: 5px;
  font-size: 13px;
  text-align: left;
}

.show-password {
  margin-top: 8px;
  font-size: 13px;
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  color: #333;
  white-space: nowrap;
}

.show-password input[type="checkbox"] {
  vertical-align: middle;
  transform: translateX(-4px) translateY(-3px);
}

.divider {
  margin: 40px 0;
  border-top: 1px solid #ddd;
}

.btn-google {
  width: 100%;
  display: flex;
  background-color: #333;
  border: none;
  color: white;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.btn-google:hover {
  background-color: #111111;
}

.google-icon {
  display: inline-block;
  background: none;
  border-radius: 0;
  width: 20px;
  height: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* برای یکسان شدن دکمه‌ها هم با input */
button,
.btn-google {
  height: 48px;
  font-size: 15px;
  padding: 0 16px;
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0 25px;
}

.keep-logged-in {
  display: flex;
  align-items: center;
  margin-top: 7px;
  gap: 6px;
  font-size: 14px;
  color: #2b3674;
  cursor: pointer;
  user-select: none;
}

.keep-logged-in input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #2d53da;
  margin: 0;
}

.keep-logged-in input[type="checkbox"]:focus {
  outline: none;
  box-shadow: none;
}

.forgot-password {
  font-size: 14px;
  color: #007aff;
  text-decoration: none;
  transition: color 0.2s;
}

.forgot-password:hover {
  text-decoration: underline;
}
.divider-with-text {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 25px 0;
  color: #999;
  font-size: 14px;
  font-weight: 500;
}

.divider-with-text::before,
.divider-with-text::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #ccc;
}

.divider-with-text::before {
  margin-right: 12px;
}

.divider-with-text::after {
  margin-left: 12px;
}
.signup-link {
  margin-top: 30px;
  font-size: 14px;
  color: #2b3674;
  text-align: center;
}

.signup-link a {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  margin-left: 5px;
}

.signup-link a:hover {
  text-decoration: underline;
}

input,
button,
.input-with-icon input,
.btn-google {
  height: 48px;
  font-size: 15px;
  border-radius: 8px;
  box-sizing: border-box;
}
</style>

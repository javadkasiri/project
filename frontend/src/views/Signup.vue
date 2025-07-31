<template>
  <div class="signup-wrapper">
    <div class="image-side"></div>
    <div class="form-side">
      <div class="signup-form">
        <h2>Signup</h2>
        <form @submit.prevent="handleSignup" novalidate>
          <!-- ایمیل -->
          <div class="form-group">
            <label for="email">Your email address</label>
            <input type="text" id="email" v-model="email" required />
            <p v-if="emailError" class="error-message">
              The email format is incorrect.
            </p>
            <p v-if="duplicateError" class="error-message">
              This email is already in use.
            </p>
          </div>

          <!-- رمز عبور -->
          <div class="form-group">
            <label for="password">Enter password</label>
            <div class="input-wrapper">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                required
              />
              <span
                class="material-icons eye-icon"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? "visibility_off" : "visibility" }}
              </span>
            </div>
            <p v-if="passwordError" class="error-message">
              The password must meet all the listed requirements.
            </p>
          </div>

          <!-- تکرار رمز عبور -->
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <div class="input-wrapper">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                v-model="confirmPassword"
                required
              />
              <span
                class="material-icons eye-icon"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                {{ showConfirmPassword ? "visibility_off" : "visibility" }}
              </span>
            </div>
            <p v-if="confirmError" class="error-message">
              Passwords do not match.
            </p>
          </div>

          <!-- شرایط رمز -->
          <ul class="password-rules">
            <li :class="{ valid: passwordRules.minLength }">
              At least 8 characters
            </li>
            <li :class="{ valid: passwordRules.uppercase }">
              At least one uppercase letter
            </li>
            <li :class="{ valid: passwordRules.lowercase }">
              At least one lowercase letter
            </li>
            <li :class="{ valid: passwordRules.number }">
              At least one number
            </li>
            <li :class="{ valid: passwordRules.specialCharacter }">
              At least one special character
            </li>
          </ul>

          <!-- دکمه ثبت -->
          <button type="submit">Register</button>

          <!-- or -->
          <div class="divider-with-text"><span>or</span></div>

          <!-- گوگل -->
          <button type="button" class="google-button">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
            />
            Sign up with Google
          </button>

          <!-- لینک ورود -->
          <p class="login-link">
            Already have an account?
            <router-link to="/Login">Log in now</router-link>
          </p>

          <!-- پیام موفقیت -->
          <p v-if="successMessage" class="success-message">
            Registration was successful
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignupPage",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      emailError: false,
      passwordError: false,
      confirmError: false,
      duplicateError: false,
      successMessage: false,
      submitted: false,
    };
  },
  computed: {
    passwordRules() {
      return {
        minLength: this.password.length >= 8,
        uppercase: /[A-Z]/.test(this.password),
        lowercase: /[a-z]/.test(this.password),
        number: /[0-9]/.test(this.password),
        specialCharacter: /[^a-zA-Z0-9]/.test(this.password),
      };
    },
    isPasswordValid() {
      const r = this.passwordRules;
      return (
        r.minLength &&
        r.uppercase &&
        r.lowercase &&
        r.number &&
        r.specialCharacter
      );
    },
  },
  watch: {
    email(value) {
      if (this.submitted) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.emailError = !emailPattern.test(value);
      }
    },
    password() {
      if (this.submitted && this.isPasswordValid) {
        this.passwordError = false;
      }
    },
    confirmPassword() {
      if (this.submitted && this.confirmPassword === this.password) {
        this.confirmError = false;
      }
    },
  },
  methods: {
    async handleSignup() {
      this.submitted = true;

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailPattern.test(this.email);
      this.passwordError = !this.isPasswordValid;
      this.confirmError = this.password !== this.confirmPassword;
      this.duplicateError = false;

      if (this.emailError || this.passwordError || this.confirmError) return;

      try {
        const res = await fetch("http://localhost:3000/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.email,
            password: this.password,
          }),
        });

        if (res.status === 409) {
          this.duplicateError = true;
          return;
        }

        const data = await res.json();

        if (res.ok) {
          this.successMessage = true;
          setTimeout(() => this.$router.push("/Login"), 2000);
        } else {
          console.error("Signup failed:", data.error || "Unknown error");
        }
      } catch (err) {
        console.error("Network error:", err);
      }
    },
  },
};
</script>

<style scoped>
.signup-wrapper {
  display: flex;
  min-height: 100vh;
}

.image-side {
  flex: 1;
  background-color: #1565c0;
}

.form-side {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.signup-form {
  width: 100%;
  max-width: 500px;
  padding: 50px;
  background: #fff;
  border-radius: 10px;
}

h2 {
  text-align: left;
  font-size: 35px;
  color: #2b3674;
  font-weight: bold;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #2b3674;
  font-size: 14px;
}

input {
  width: 100%;
  height: 48px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input {
  padding-right: 44px;
}

input:focus {
  outline: none;
  /*border-color: #869dff;*/
  box-shadow: 0 0 0 1px #333; /* نازک‌تر از قبل */
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

.password-rules {
  list-style: none;
  padding-left: 0;
  margin-top: -5px;
  margin-bottom: 15px;
  font-size: 13px;
  text-align: left;
  color: #a3aed0;
}

.password-rules li {
  margin: 4px 0;
}

.password-rules li.valid {
  font-weight: bold;
  color: #0e3168;
}

button[type="submit"],
.google-button {
  width: 100%;
  height: 48px;
  font-size: 15px;
  font-weight: bold;
  padding: 0 16px;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"] {
  background-color: #1565c0;
  color: white;
  border: none;
}

button[type="submit"]:hover {
  background-color: #0d47a1;
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

.google-button {
  display: flex;
  background-color: #333;
  border: none;
  border-radius: 5px;
  color: white;
  justify-content: center;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease;
}

.google-button:hover {
  background-color: #111;
}

.google-button img {
  width: 18px;
  height: 18px;
}

.login-link {
  text-align: center;
  font-size: 14px;
  margin-top: 30px;
  color: #0e3168;
}

.login-link a {
  color: #409bff;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

.error-message {
  color: red;
  font-size: 13px;
  margin-top: 5px;
}

.success-message {
  color: #1565c0;
  text-align: center;
  margin-top: 15px;
  font-weight: bold;
}
</style>

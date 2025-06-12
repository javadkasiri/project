const express = require("express"); // فریم‌ورک اصلی بک‌اند
const cookieParser = require("cookie-parser"); // برای خواندن کوکی‌ها مثل توکن JWT
const mongoose = require("mongoose"); // برای اتصال به MongoDB
const cors = require("cors"); // برای اجازه ارتباط بین فرانت‌اند و بک‌اند
const authRoutes = require("./routes/auth"); // مسیرهای احراز هویت (signup, login, logout)
const protectedRoutes = require("./routes/protected"); // مسیرهای محافظت‌شده
const dumdbRoutes = require("./routes/dumdb"); // ✅ مسیر داینامیک MongoDB

require("dotenv").config(); // برای خواندن متغیرهای محیطی

const app = express(); // ایجاد اپلیکیشن

// فعال‌سازی CORS برای فرانت‌های مختلف
app.use(
  cors({
    origin: [
      "http://localhost:8081",
      "http://localhost:8082",
      "http://localhost:8083",
    ],
    credentials: true,
  })
);

app.use(express.json()); // پارس کردن بدنه JSON
app.use(cookieParser()); // خواندن کوکی‌ها

// اتصال به MongoDB
mongoose
  .connect("mongodb://172.25.199.96:27017/vueapp")
  .then(() => console.log("✅ MongoDB connected (via mongoose)"));

// مسیرهای API
app.use("/api", authRoutes); // 🔐 signup, login, logout
app.use("/api", protectedRoutes); // 🔒 مسیرهایی مثل /dashboard
app.use("/api", dumdbRoutes); // 🔁 مسیر منعطف /api/dumdb

// شروع سرور
app.listen(3000, () => console.log("🚀 Server started on port 3000"));

# 🔐 Experiment 8 — JWT Frontend Integration
### *Secure. Stateless. Role-Aware. Now with a UI.*

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java) ![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.3-green?style=for-the-badge&logo=springboot) ![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react) ![JWT](https://img.shields.io/badge/JWT-Secured-purple?style=for-the-badge&logo=jsonwebtokens) ![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-blueviolet?style=for-the-badge&logo=bootstrap)

---

## 📌 What is this?

A **full-stack web application** combining a JWT-secured **Spring Boot backend** (from Exp 7) with a brand-new **React frontend**. Users log in through a real UI, receive a signed JWT stored in `sessionStorage`, and navigate to a protected dashboard — with automatic redirects and 401/403 handling.

---

## ✨ Features

* 👑 **ADMIN role** — full access including admin-only endpoints
* 👤 **USER role** — restricted to user-level endpoints only
* 🎨 **React Login UI** — clean form with MUI + Bootstrap styling
* 🔑 **JWT stored in sessionStorage** — no cookies, no server sessions
* 🛡️ **Protected dashboard** — auto-redirects if token is missing
* 🚪 **Logout** — clears token and redirects to login
* ⚡ **Stateless** — zero server-side sessions
* 🔒 **401 / 403 handled** in the UI with error alerts

---

## ⚙️ Tech Stack

### ☕ Backend
| Technology | Version | Role |
|---|---|---|
| Java | 17 | Core language |
| Spring Boot | 3.2.3 | Backend framework |
| Spring Security | 6.2.2 | Auth & authorization |
| JWT (jjwt) | 0.11.5 | Token generation & validation |
| Maven | 3.9.x | Build tool |

### 🎨 Frontend
| Technology | Version | Role |
|---|---|---|
| React | 18.2.0 | UI framework |
| React Router DOM | 6.x | Client-side routing |
| Axios | 1.6.x | HTTP requests |
| Bootstrap | 5.3.x | Responsive layout |
| Material UI (MUI) | 5.x | Component library |

---

## 📁 Project Structure
Vaidehi_Exp8/
├── 🎨 frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Login.js        ← Login form (MUI + Bootstrap)
│       │   └── Dashboard.js    ← Protected dashboard page
│       ├── App.js              ← React Router setup
│       └── index.js            ← Entry point
├── ☕ src/main/java/com/example/jwt_demo/
│   ├── controllers/
│   │   ├── AuthController.java
│   │   ├── AdminController.java
│   │   └── UserController.java
│   ├── security/
│   │   ├── JwtUtil.java
│   │   ├── JwtFilter.java
│   │   ├── SecurityConfig.java
│   │   └── TokenBlacklist.java
│   └── JwtDemoApplication.java
├── 📸 screenshots/
├── pom.xml
└── README.md

---

## 👥 Users & Credentials

| Username | Password | Role | Access |
|---|---|---|---|
| `admin` | `admin123` | 👑 ADMIN | All endpoints |
| `vaidehi` | `user123` | 👤 USER | `/user/**` only |

---

## 📡 API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/login` | None | Authenticate → receive JWT |
| `POST` | `/logout` | Bearer | Blacklist & invalidate token |
| `GET` | `/admin/dashboard` | 👑 ADMIN | Admin dashboard |
| `GET` | `/admin/users` | 👑 ADMIN | List all users |
| `GET` | `/user/profile` | 👤 USER or ADMIN | User profile |
| `GET` | `/user/dashboard` | 👤 USER or ADMIN | User dashboard |

---

## 🚀 Getting Started

### 1️⃣ Clone & Start Backend
```bash
git clone https://github.com/vaidehi84/Experiment-8.git
cd Experiment-8
mvn spring-boot:run
```
> 🌐 Backend runs at `http://localhost:8083`

### 2️⃣ Start React Frontend
```bash
cd frontend
npm install
npm start
```
> 🌐 Frontend runs at `http://localhost:3000`

---

## 🔄 Authentication Flow
User enters credentials on Login.js
↓
POST /login → JWT returned
↓
sessionStorage.setItem("token", jwt)
↓
Redirect to /dashboard
↓
Dashboard reads token → GET /protected
with Authorization: Bearer <token>
↓
Backend validates → Data displayed
↓
Logout → sessionStorage.clear()
↓
Redirect to /login

---

## 📸 Screenshots

### 1️⃣ Admin Login — 200 OK ✅
![Admin Login](screenshots/1_login_admin_success.png)

### 2️⃣ Admin Dashboard — Token in DevTools ✅
![Admin Dashboard](screenshots/2_admin_dashboard_success.png)

### 3️⃣ User Login — 200 OK ✅
![User Login](screenshots/3_login_user_success.png)

### 4️⃣ User Profile — Protected Data ✅
![User Profile](screenshots/4_user_profile_success.png)

### 5️⃣ USER Denied Admin Route — 403 Forbidden ❌
![Access Denied](screenshots/5_user_denied_admin.png)

### 6️⃣ No Token — 401 Unauthorized ❌
![401 Error](screenshots/6_no_token_401.png)

### 7️⃣ Invalid Credentials — Error Alert ❌
![Invalid Login](screenshots/7_invalid_login.png)

---

## 🎯 Key Concepts

| Concept | How it works |
|---|---|
| 🔑 Token Generation | HS256 signed JWT with role claim, 1hr expiry |
| 🛡️ Token Validation | `JwtFilter` intercepts every request |
| 👑 Role Enforcement | Spring Security `hasRole` on URL patterns |
| 🚫 Token Blacklisting | In-memory `HashSet` on logout |
| ⚡ Stateless Auth | No server-side sessions |
| 🎨 Frontend Auth | `sessionStorage` + Axios Bearer header |
| 🔀 Route Protection | `useEffect` redirects if no token found |

---

## 💡 Key Code Snippets

**Store token after login:**
```js
sessionStorage.setItem("token", res.data.token);
```

**Call protected API with token:**
```js
axios.get("http://localhost:8083/protected", {
  headers: { Authorization: "Bearer " + token }
});
```

**Protect frontend routes:**
```js
useEffect(() => {
  if (!sessionStorage.getItem("token"))
    window.location.href = "/";
}, []);
```

---

> 📝 *Part of FullStack Development 2026 Lab Series | Built by Vaidehi Sharma*

📋 How to use this:

Open your project folder
Delete the old README.md
Create a new README.md and paste everything above
Then push:

bashgit add README.md
git commit -m "Update README with screenshots and full docs"
git push

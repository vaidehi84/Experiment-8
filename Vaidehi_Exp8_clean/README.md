# Experiment 8 — Frontend Integration with JWT APIs (Session-Based UI)

**Student Name:** Vaidehi Sharma  
**Course:** FullStack Development 2026  
**Based on:** Experiment 6 (Spring Boot JWT Backend)

---

## Project Overview

This experiment builds a **React frontend** that consumes the JWT-secured backend APIs from Experiment 6.

Key features:
- Login page that calls `POST /login` and stores JWT in `sessionStorage`
- Protected Dashboard page that calls `GET /protected` using Bearer token
- Session-based route restriction — unauthenticated users are redirected to login
- Logout functionality that clears the session token

---

## Tech Stack

### Backend (from Experiment 6)
| Technology | Version |
|---|---|
| Java | 17 |
| Spring Boot | 3.2.3 |
| Spring Security | 6.2.2 |
| JWT (jjwt) | 0.11.5 |
| Maven | 3.9.x |

### Frontend (New — Experiment 8)
| Technology | Version |
|---|---|
| React | 18.2.0 |
| React Router DOM | 6.x |
| Axios | 1.6.x |
| Bootstrap | 5.3.x |
| Material UI (MUI) | 5.x |

---

## Project Structure

```
Vaidehi_Exp8/
├── frontend/                        ← React Frontend (NEW — Exp 8)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js             ← Login page with MUI + Bootstrap
│   │   │   └── Dashboard.js         ← Protected dashboard with token display
│   │   ├── App.js                   ← React Router setup
│   │   └── index.js                 ← Entry point, imports Bootstrap CSS
│   └── package.json
├── src/                             ← Spring Boot Backend (from Exp 6)
│   └── main/java/com/example/jwt_demo/
│       ├── controllers/
│       │   ├── AuthController.java
│       │   ├── AdminController.java
│       │   └── UserController.java
│       ├── security/
│       │   ├── JwtUtil.java
│       │   ├── JwtFilter.java
│       │   ├── SecurityConfig.java
│       │   └── TokenBlacklist.java
│       └── JwtDemoApplication.java
├── screenshots/
├── pom.xml
└── README.md
```

---

## How to Run

### Step 1 — Start the Backend

```bash
mvn spring-boot:run
```

Backend runs at: `http://localhost:8083`

### Step 2 — Start the React Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

---

## User Credentials

| Username | Password | Role |
|---|---|---|
| `admin` | `admin123` | `ADMIN` |
| `vaidehi` | `user123` | `USER` |

---

## Session-Based Authentication Flow

```
User enters credentials (Login.js)
        ↓
POST /login → Backend validates → Returns JWT
        ↓
sessionStorage.setItem("token", jwt)
        ↓
Redirect to /dashboard
        ↓
Dashboard.js reads token from sessionStorage
        ↓
GET /protected with Authorization: Bearer <token>
        ↓
Backend validates token → Returns protected data
        ↓
Logout: sessionStorage.removeItem("token") → Redirect to /
```

---

## API Endpoints Used

| Method | Endpoint | Usage in Frontend |
|---|---|---|
| POST | `/login` | Login.js — on form submit |
| GET | `/protected` | Dashboard.js — on "Fetch Data" button |

---

## Required Screenshots

| # | File | Description |
|---|---|---|
| 1 | `1_login_admin_success.png` | Login page in React UI — successful login |
| 2 | `2_admin_dashboard_success.png` | sessionStorage token visible in DevTools |
| 3 | `3_login_user_success.png` | User login via React form |
| 4 | `4_user_profile_success.png` | Protected data visible on dashboard |
| 5 | `5_user_denied_admin.png` | Unauthorized access — redirect to login |
| 6 | `6_no_token_401.png` | 401 error shown in UI when token missing |
| 7 | `7_invalid_login.png` | Error alert for invalid credentials |

---

## Key Implementation Details

### Token Storage (sessionStorage)
```js
// Store after login
sessionStorage.setItem("token", res.data.token);

// Read on dashboard
const token = sessionStorage.getItem("token");

// Clear on logout
sessionStorage.removeItem("token");
```

### Calling Protected API
```js
const res = await axios.get("http://localhost:8083/protected", {
  headers: {
    Authorization: "Bearer " + token
  }
});
```

### Route Protection
```js
useEffect(() => {
  if (!token) {
    window.location.href = "/";  // Redirect to login if no token
  }
}, []);
```

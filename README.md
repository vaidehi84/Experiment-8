# 🔐 Experiment 8 — Frontend Integration with JWT APIs
### *Session-Based Authentication UI using React + Spring Boot*

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.3-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Secured-purple?style=for-the-badge&logo=jsonwebtokens)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![MUI](https://img.shields.io/badge/Material_UI-5.x-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.6.x-5A29E4?style=for-the-badge&logo=axios)

> 🧪 **Based on Experiment 6** — Uses the Spring Boot JWT backend (login + protected routes)

---

## 🎯 Objective

- Build a **React frontend UI** that consumes JWT-secured APIs
- Implement **session-based authentication** (token stored in `sessionStorage`)
- Restrict access to pages based on **login state**
- Demonstrate tested endpoints from the frontend UI

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔑 Login Page | Calls `POST /login`, stores JWT in `sessionStorage` |
| 🛡️ Protected Dashboard | Only accessible when JWT exists in session |
| 📡 Fetch Data | Calls `GET /protected` with Bearer token in header |
| 🚪 Logout | Clears `sessionStorage` and redirects to login |
| 🔀 Route Guard | Auto-redirects unauthenticated users to login |
| ⚡ Stateless | Zero server-side sessions — token lives in browser |

---

## 💻 Tech Stack

### 🎨 Frontend
| Technology | Version | Role |
|---|---|---|
| React | 18.2.0 | UI Framework |
| Bootstrap | 5.3.x | Layout & Styling |
| Material UI (MUI) | 5.x | UI Components |
| Axios | 1.6.x | API Calls |

### ☕ Backend (Experiment 6)
| Technology | Version | Role |
|---|---|---|
| Java | 17 | Core language |
| Spring Boot | 3.2.3 | Backend Framework |
| Spring Security | 6.2.2 | Auth & Authorization |
| JWT (jjwt) | 0.11.5 | Token Generation |

---

## 📁 Project Structure
frontend/
├── src/
│   ├── components/
│   │   ├── Login.js        ← Login form (Bootstrap + MUI)
│   │   └── Dashboard.js    ← Protected page with token check
│   ├── App.js              ← React Router setup
│   └── index.js            ← Bootstrap CSS import

---

## ⚙️ Installation & Setup

### 1️⃣ Create React App & Install Dependencies
```bash
npx create-react-app frontend
cd frontend
npm install axios bootstrap @mui/material @emotion/react @emotion/styled
```

### 2️⃣ Add Bootstrap in `index.js`
```js
import 'bootstrap/dist/css/bootstrap.min.css';
```

### 3️⃣ Start Backend (Spring Boot)
```bash
mvn spring-boot:run
```
> 🌐 Runs at `http://localhost:8083`

### 4️⃣ Start Frontend
```bash
npm start
```
> 🌐 Runs at `http://localhost:3000`

---

## 🧱 React Implementation

### 📄 Login.js
```jsx
import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios.post("http://localhost:8083/login", {
      username,
      password
    });
    if (res.data.token) {
      sessionStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <input className="form-control" onChange={(e) => setUsername(e.target.value)} placeholder="Username" /><br/>
      <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" /><br/>
      <button className="btn btn-primary" onClick={login}>Login</button>
    </div>
  );
}

export default Login;
```

### 📄 Dashboard.js
```jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState("");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) window.location.href = "/";
  }, []);

  const getData = async () => {
    const res = await axios.get("http://localhost:8083/protected", {
      headers: { Authorization: "Bearer " + token }
    });
    setData(res.data);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <button className="btn btn-success me-2" onClick={getData}>Fetch Data</button>
      <button className="btn btn-danger" onClick={logout}>Logout</button>
      <p>{data}</p>
    </div>
  );
}

export default Dashboard;
```

---

## 🔄 Authentication Flow
User enters Username & Password
↓
POST /login → JWT returned
↓
sessionStorage.setItem("token", jwt)
↓
Redirect to /dashboard
↓
useEffect checks token exists?
✅ Yes → Show dashboard
❌ No  → Redirect to /
↓
GET /protected → Bearer <token>
↓
Data displayed on UI
↓
Logout → sessionStorage.clear()
↓
Redirect to /login

---

## 🔐 Session-Based Route Protection

```js
// Allow dashboard only if token exists
useEffect(() => {
  if (!sessionStorage.getItem("token"))
    window.location.href = "/";   // Redirect to login
}, []);
```

```js
// Call protected API with token
headers: { Authorization: "Bearer " + token }
```

```js
// Logout — clear session
sessionStorage.removeItem("token");
```

---

## 📸 Screenshots

<table>
  <tr>
    <td align="center">
      <b>1️⃣ Login from React UI ✅</b><br/><br/>
      <img src="screenshots/1_login_admin_success.png" width="420"/>
    </td>
    <td align="center">
      <b>2️⃣ Token in sessionStorage (DevTools) ✅</b><br/><br/>
      <img src="screenshots/2_admin_dashboard_success.png" width="420"/>
    </td>
  </tr>
  <tr>
    <td align="center">
      <b>3️⃣ User Login Success ✅</b><br/><br/>
      <img src="screenshots/3_login_user_success.png" width="420"/>
    </td>
    <td align="center">
      <b>4️⃣ Protected Data on Dashboard ✅</b><br/><br/>
      <img src="screenshots/4_user_profile_success.png" width="420"/>
    </td>
  </tr>
  <tr>
    <td align="center">
      <b>5️⃣ Unauthorized Access → Redirect ❌</b><br/><br/>
      <img src="screenshots/5_user_denied_admin.png" width="420"/>
    </td>
    <td align="center">
      <b>6️⃣ No Token — 401 Unauthorized ❌</b><br/><br/>
      <img src="screenshots/6_no_token_401.png" width="420"/>
    </td>
  </tr>
  <tr>
    <td align="center" colspan="2">
      <b>7️⃣ Logout Functionality ✅</b><br/><br/>
      <img src="screenshots/7_invalid_login.png" width="420"/>
    </td>
  </tr>
</table>

---

## 🎯 Key Concepts

| Concept | How it works |
|---|---|
| 🔑 JWT Login | `POST /login` returns signed token |
| 💾 Token Storage | `sessionStorage` — cleared on tab close |
| 🛡️ Route Guard | `useEffect` checks token on every load |
| 📡 API Call | Axios with `Authorization: Bearer <token>` |
| 🚪 Logout | `sessionStorage.removeItem("token")` |
| ⚡ Stateless | No server sessions — frontend manages state |

---

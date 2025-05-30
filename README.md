# 🔐 Login & Signup App

## 📄 Description  
This is a full-stack **Login & Signup** application built with a **React frontend** and **Express backend**. It features:
- Secure password hashing 🔒  
- JWT-based session management 🔑  
- Animated, validated forms with a clean UI 💻✨  

---

## 🚀 Features
- 📝 User Registration with name, email, password & terms acceptance  
- 🔓 User Login with email and password  
- 🔐 Password hashing via **bcrypt**  
- 🛡️ **JWT Authentication** stored in **HTTP-only cookies**  
- 🔒 Protected route: `/dashboard` (accessible only to logged-in users)  
- ✅ Client-side validation with `react-hook-form`  
- 🎞️ Smooth animations using `framer-motion`  
- 📦 Backend validation via `express-validator`  
- 🧯 Security headers using `helmet`  
- 🔁 Cross-origin support with `cors`

---

## 🧰 Technologies Used

### 🛠️ Backend
- 🟢 Node.js  
- 🚂 Express  
- 🧂 bcrypt  
- 🪪 jsonwebtoken  
- ✅ express-validator  
- 🪖 helmet  
- 🌐 cors  
- 🍪 cookie-parser

### 🎨 Frontend
- ⚛️ React  
- 🧭 React Router DOM  
- 🔍 react-hook-form  
- 🎬 framer-motion  
- 🎭 clsx

---

## 🛠️ Installation & Setup

### 🔧 Backend Setup
```bash
cd backend        # 📁 Navigate to backend folder
npm install       # 📦 Install dependencies
npm run dev       # 🚀 Run server on http://localhost:5000
```

### 🎨 Frontend Setup
```bash
cd frontend       # 📁 Navigate to frontend folder
npm install       # 📦 Install dependencies
npm start         # 🚀 Run app on http://localhost:3000
```

---

## 🏁 Running the Application
1. 🌐 Open your browser → `http://localhost:3000`  
2. 🆕 Sign up for a new account  
3. 🔐 Log in with your credentials  
4. 🧭 Get redirected to your **Protected Dashboard**  

---

## 🌐 API Endpoints

### 📬 `POST /api/auth/signup`
**Registers a new user**

📥 Request:
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string",
  "terms": "true"
}
```

📤 Response:
- ✅ `201 Created` on success  
- ❌ `400 Bad Request` on validation failure or existing user  

---

### 🔑 `POST /api/auth/login`
**Logs in an existing user**

📥 Request:
```json
{
  "email": "string",
  "password": "string"
}
```

📤 Response:
- ✅ `200 OK` with HTTP-only cookie  
- ❌ `400 Bad Request` for invalid credentials  

---

### 🙋‍♂️ `GET /api/auth/me`
**Returns authenticated user's info**  
📤 Requires JWT in HTTP-only cookie

📤 Response:
```json
{
  "id": "number",
  "name": "string",
  "email": "string"
}
```

---

## 📜 License
🆓 Open Source under the **MIT License**  
Use it. Modify it. Share it. 🚀

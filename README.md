# 🚀 MERN Full Stack — Learning Journey

> A complete full-stack development course repository covering **45+ lectures** — from raw HTML to production-grade MERN applications with authentication, file uploads, and RESTful APIs.

---

## 📖 About This Repository

This isn't just a single project — it's a **structured learning path** through modern web development. Each lecture folder is a standalone milestone, progressively introducing new concepts, from basic React components all the way to a full e-commerce backend with MongoDB, JWT auth, and Multer image uploads.

Built with real-world patterns in mind: MVC architecture, modular routing, middleware, context API, Redux, and more.

---

## 🗂️ Lecture Breakdown

### 🌐 Frontend — React Fundamentals (`Lecture 1–13`)

| Lecture | Topic |
|---|---|
| Lecture 1 | HTML Introduction |
| Lecture 2 | JSX Introduction |
| Lecture 3 | React Components |
| Lecture 4 | Project Setup with Vite |
| Lecture 5 | `useState` Hook |
| Lecture 6–7 | Todo App (v1 & v2) |
| Lecture 8 | Todo App Refactor (modular components) |
| Lecture 9 | Todo App + LocalStorage |
| Lecture 10 | `useContext` Hook |
| Lecture 11 | Joke App (API fetch) |
| Lecture 12 | Users App |

### ⚛️ React — Advanced Projects (`Lecture 14–27`)

| Lecture | Topic |
|---|---|
| Lecture 14 | E-Commerce Concept (Cart Context) |
| Lecture 15 | Expense Tracker (with Charts) |
| Lecture 16 | GitHub Profile Finder |
| Lecture 17 | Movie Search App (TMDB API) |
| Lecture 18 | AI Assistant (Zarvis Mini) |
| Lecture 19 | Calculator |
| Lecture 20 | JSON Formatter |
| Lecture 23 | Box Shadow Generator |
| Lecture 24 | Image Upload & Preview |
| Lecture 25 | QR Code Generator |
| Lecture 26 | Infinite Scroll |
| Lecture 27 | Quiz App |

### 🛠️ Backend — Node.js & Express (`Lecture 28–37`)

| Lecture | Topic |
|---|---|
| Lecture 28 | Intro to Backend / Express Server |
| Lecture 29 | Local API + React Frontend |
| Lecture 30 | Pure Node.js Server (no framework) |
| Lecture 31 | Bun Runtime Introduction |
| Lecture 32 | API with URL Params |
| Lecture 33 | Server + MongoDB Backend |
| Lecture 34 | MongoDB Connection (2 approaches) |
| Lecture 35 | `.env` / `dotenv` Configuration |
| Lecture 36 | MVC Architecture Setup |

### 🔐 Full Stack — CRUD, Auth & File Uploads (`Lecture 38–45`)

| Lecture | Topic |
|---|---|
| Lecture 38 | Full CRUD (Employee App v1) |
| Lecture 39 | Full CRUD (Employee App v2) |
| Lecture 40 | bcrypt Password Hashing |
| Lecture 41 | bcrypt + Login Flow |
| Lecture 42 | Auth Middleware + Protected Routes |
| Lecture 43 | Multer Image Upload System |
| Lecture 44 | NodeMailer + OTP Email |
| Lecture 45 | **BiKart** — Full E-Commerce App |

### 🎯 Bonus Projects

| Project | Description |
|---|---|
| `PomoDoro` | Pomodoro Timer with music |
| `ReactRouter` | Multi-page SPA with React Router |
| `TypingMaster` | Typing speed test app |

---

## 🏗️ Tech Stack

**Frontend**
- React.js + Vite
- JavaScript ES6+
- Tailwind CSS / Custom CSS
- React Router DOM
- Redux Toolkit (BiKart)
- Context API
- Axios / Fetch API

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- bcrypt (password hashing)
- JWT (JSON Web Tokens)
- Multer (file/image uploads)
- NodeMailer (email/OTP)
- dotenv

**Dev Tools**
- Git & GitHub
- Postman
- VS Code / GitHub Codespaces
- npm / Bun

---

## ⭐ Highlight Project — BiKart (`Lecture-45`)

The most complete project in this repo — a full e-commerce application with:

- 🛒 Product listing, detail pages, and cart
- 👤 User registration, login, and profile
- 🔐 JWT authentication + protected routes
- 🖼️ Product image upload via Multer
- 📦 Redux Toolkit for cart state management
- 🗄️ MongoDB with full CRUD via RESTful API
- 🧱 MVC folder structure (Controllers, Models, Routes, Middleware)

---

## 📁 Project Structure

```
mern-fullstack/
│
├── Lecture-1 to Lecture-27/     # React frontend projects
│   └── src/
│       ├── App.jsx
│       ├── components/
│       └── pages/
│
├── Lecture-28 to Lecture-45/    # Full stack (Backend + Frontend)
│   ├── Backend/
│   │   ├── server.js
│   │   ├── Controller/
│   │   ├── Model/
│   │   ├── Router/
│   │   └── Middleware/
│   └── Frontend/
│       └── src/
│
├── PomoDoro/
├── ReactRouter/
├── TypingMaster/
└── README.md
```

---

## 🚀 Getting Started

**Clone the repository**
```bash
git clone https://github.com/ajitdev01/mern-fullstack.git
cd mern-fullstack
```

**Navigate to any lecture folder**
```bash
cd Lecture-45-BiKart/Backend
```

**Install dependencies & run backend**
```bash
npm install
node server.js
# or
npm run dev
```

**Install dependencies & run frontend**
```bash
cd ../Frontend
npm install
npm run dev
```

> Each lecture has its own `package.json` — they run independently.

---

## 📚 Learning Outcomes

After completing this course path, you will have hands-on experience with:

- ✅ Building and structuring React apps from scratch
- ✅ React hooks — `useState`, `useEffect`, `useContext`, `useRef`
- ✅ React Router for multi-page SPAs
- ✅ Redux Toolkit for global state management
- ✅ REST API design with Express.js
- ✅ MongoDB CRUD with Mongoose
- ✅ User authentication (bcrypt + JWT)
- ✅ File upload handling with Multer
- ✅ Sending emails via NodeMailer
- ✅ MVC architecture in Node.js
- ✅ Connecting frontend and backend with Axios

---

## 🔭 Future Improvements

- [ ] Role-based authorization (admin/user)
- [ ] Refresh token implementation
- [ ] Payment gateway integration
- [ ] Docker containerization
- [ ] CI/CD pipeline setup
- [ ] Deployment (Vercel + Render / Railway)
- [ ] Unit and integration testing

---

## 👨‍💻 Author

**Ajit** — [@ajitdev01](https://github.com/ajitdev01)

Built as a structured full-stack learning journey. Every lecture is a stepping stone toward production-ready MERN development.

---

> ⭐ Star this repo if it helped you or inspired your own learning path!

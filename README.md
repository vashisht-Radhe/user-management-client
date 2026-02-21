Here’s a clean, professional, human-written README for your frontend — matching the quality of your backend README 👇

---

# User Management Client

A modern React frontend for the User Management System.
Built with **React + Vite**, this application provides authentication, role-based access, and admin activity management with a clean and responsive UI.

---

## 🚀 Features

- User Registration & Login
- JWT-based Authentication
- Role-based Access (Admin / User)
- Admin Dashboard
- Activity Logs with Pagination
- Protected Routes
- API Integration with Backend
- Responsive UI
- Toast Notifications
- Loading & Error Handling States

---

## 🛠 Tech Stack

- React
- Vite
- Axios
- React Router
- Tailwind CSS
- Context API (Auth state)

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
npm install
```

---

## ⚙️ Environment Setup

Create a `.env.development.local` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5500/api/v1
```

For production:

```env
VITE_API_BASE_URL=https://your-backend-url.com/api/v1
```

⚠️ Never commit `.env` files to GitHub.

---

## ▶️ Running the App

Development mode:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## 📁 Project Structure

```
├── public/
│   ├── login.webp
│   └── vite.svg
│
├── src/
│   ├── components/          # Reusable UI & layout components
│   │   ├── ui/              # Small reusable UI elements (Button, Input, Spinner)
│   │   └── layout/          # Layout components (Navbar, Sidebar, Admin/User Layout)
│   │
│   ├── pages/               # Application pages
│   │   ├── auth/            # Authentication pages (Login, Register, OTP, Reset)
│   │   ├── user/            # User dashboard & profile pages
│   │   ├── admin/           # Admin dashboard & management pages
│   │   ├── Home.jsx
│   │   └── NotFound.jsx
│   │
│   ├── routes/              # Route protection (User, Admin, Guest routes)
│   ├── services/            # API service layer (auth, admin, user)
│   ├── hooks/               # Custom React hooks
│   ├── context/             # Global state management (AuthContext)
│   ├── schemas/             # Validation schemas
│   ├── utilis/              # Utility components & helpers (Timer, mock auth)
│   ├── styles/              # Global & UI styles
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
│
├── index.html
├── vite.config.js
├── package.json
├── eslint.config.js
├── .gitignore
└── README.md
```

---

## 🔐 Authentication Flow

1. User logs in
2. JWT token is stored securely (localStorage or cookies)
3. Protected routes validate token
4. Admin routes require role-based authorization

---

## 🌐 Deployment

1. Deploy backend first.
2. Update `VITE_API_BASE_URL` with the deployed backend URL.
3. Deploy frontend to:
   - Render
   - Vercel
   - Netlify

---

## 📌 Notes

- Ensure backend server is running before starting frontend.
- API base URL must match backend deployment.
- Pagination is handled via backend query parameters (`page`, `limit`).

---

## 👨‍💻 Author

Built as a full-stack learning project to demonstrate authentication, authorization, pagination, and production-ready environment configuration.

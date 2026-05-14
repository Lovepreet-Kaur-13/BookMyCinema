# 🎬 BookMyCinema 🍿

A full-stack movie ticket booking application built using React, Node.js, Express, and MongoDB.

This project allows users to browse movies, view theatres and shows, while theatre partners can manage theatres and schedule movie shows.

---

## ✨ Features

- User Authentication (Login & Register)
- JWT-based Authentication
- Protected Routes
- Admin Dashboard
- Movie Listings
- Show Scheduling
- Redux State Management
- Responsive Frontend UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Redux
- Axios
- CSS
- Ant Design

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Authentication using JWT
- Password Hashing using bcrypt

---

## 📁 Folder Structure

```bash
BOOKMYCINEMA/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── App.js
│   │   └── index.js
│   │
│   ├── package.json
│   └── README.md
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
│
├── .gitignore
└── README.md
```

---

## 🚀 Run Project Locally

### 1. Clone Repository

```bash
git clone https://github.com/Lovepreet-Kaur-13/BookMyCinema.git
cd BookMyCinema
```

---

### 2. Backend Setup

```bash
cd server
npm install
node server.js
```

Backend runs on:

```txt
http://localhost:8081
```

---

### 3. Frontend Setup

```bash
cd client
npm install
npm start
```

Frontend runs on:

```txt
http://localhost:3000
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `server` folder.

```env
MONGO_URL=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=8081
```

---

## 📸 Screenshots

- Home Page
- Login Page


- Admin Dashboard
- Theatre Management Page

---

## 📌 Project Status

🚧 Project is currently under development.

### Upcoming Features

- Online Payment Integration
- Booking History
- Email Notifications
- Seat Selection UI Improvements
- Improve Home Page

---

## 📚 Learning Outcomes

- Built REST APIs using Express.js
- Implemented JWT Authentication
- Managed global state using Redux
- Practiced MongoDB schema design
- Worked with protected routes and middleware

---

## 👨‍💻 Author

**Lovepreet Kaur Khela**

🔗 GitHub: https://github.com/Lovepreet-Kaur-13
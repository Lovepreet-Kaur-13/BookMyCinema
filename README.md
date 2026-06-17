# 🎬 BookMyCinema 🍿

A full-stack movie ticket booking application built using React, Node.js, Express, and MongoDB.

This project demonstrate a online ticket booking platform like BookMyShow.It allows users to browse movies, select theatres, check show timings, view seat availability, make payment and book tickets conveniently. 

---

## ✨ Features

- User Authentication (Login & Register)
- JWT-based Authentication
- Protected Routes
- Admin Dashboard
- Theatre Partner Dashboard
- Movie Listings
- Show Scheduling
- Seat Layout
- Make Payment using Stripe Test card
- Redux State Management
- Responsive Frontend UI
- Confirmation email using Sendgrid
- Forgot and Reset Password functionality

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

## User Interface
- Landing Page
 <img width="1320" height="579" alt="image" src="https://github.com/user-attachments/assets/3e8a83cb-ec26-4fb3-9e3c-6ece1b2ff8eb" />

- Login Page
 <img width="1320" height="547" alt="image" src="https://github.com/user-attachments/assets/f7fcacb7-5fcc-42d2-921a-da57eb293cf8" />

- Register Page
 <img width="1320" height="586" alt="image" src="https://github.com/user-attachments/assets/7ae57f91-f4d1-4a28-996d-2f3f166db217" />

- Home Page
 <img width="1920" height="1407" alt="image" src="https://github.com/user-attachments/assets/d531a229-cf54-4df2-af53-c97618388abe" />

- Single Movie Page
 <img width="1320" height="715" alt="image" src="https://github.com/user-attachments/assets/57a98438-c95e-47f4-838b-b786b1575ccb" />

- Seat Layout
 <img width="1320" height="899" alt="image" src="https://github.com/user-attachments/assets/86c8d073-b7ab-4bd7-ae21-d7c1b731bfe5" />

- My Bookings
 <img width="1920" height="1217" alt="image" src="https://github.com/user-attachments/assets/530f3718-0782-4c18-abaa-10299e57bb22" />

- Admin Interface
- Movie Management page
 <img width="1920" height="1447" alt="image" src="https://github.com/user-attachments/assets/7d4eb2f2-cc84-48d3-acea-22bbd6a67156" />

- Add Movie Modal
  <img width="1920" height="1447" alt="image" src="https://github.com/user-attachments/assets/cbe97d9c-4780-4c0c-bb63-2a58d2428a44" />

-Edit Movie Modal
 <img width="1920" height="1447" alt="image" src="https://github.com/user-attachments/assets/4e803df5-0f54-490f-911c-c882fb1ffd0d" />

- Delete Movie Modal
 <img width="1149" height="332" alt="image" src="https://github.com/user-attachments/assets/f82e3298-ad47-4231-b72d-95c06cac5a79" />

- Theatre Management Page
  <img width="1920" height="1128" alt="image" src="https://github.com/user-attachments/assets/1788e57c-cd95-40ad-a137-a15a08cbc86c" />

- Add Theatre Modal
  <img width="1320" height="649" alt="image" src="https://github.com/user-attachments/assets/2cef518b-6c2d-4aa3-a361-77f3a8a9e964" />

- Edit Theatre Modal
  <img width="1320" height="776" alt="image" src="https://github.com/user-attachments/assets/c64a5f9e-927d-4bd1-a8b1-833e2ae7fdef" />

- Delete Theatre Modal
  <img width="1145" height="439" alt="image" src="https://github.com/user-attachments/assets/8d311cf7-ac9c-4eb5-962d-04369faaf2c8" />

- Show Management
  <img width="1320" height="776" alt="image" src="https://github.com/user-attachments/assets/080de11a-2c9f-4217-a9de-145c50f2da86" />

- Add Show Modal
  <img width="1148" height="531" alt="image" src="https://github.com/user-attachments/assets/97f21859-cd1b-4d15-a471-d9206f384b0f" />

- Edit Show Modal
  <img width="1145" height="521" alt="image" src="https://github.com/user-attachments/assets/070f5d24-0c9e-4ff1-88db-a74968122cf1" />

- Forgot password
  <img width="1320" height="530" alt="image" src="https://github.com/user-attachments/assets/668235aa-b29f-4b3d-b8fd-54f5f4efdc1a" />

- Reset Password
  <img width="1320" height="513" alt="image" src="https://github.com/user-attachments/assets/eea4279c-baa2-4cf7-9c95-4a5c6e317f17" />

- Reset password Email Notification
  <img width="1920" height="968" alt="image" src="https://github.com/user-attachments/assets/f1b162fb-6761-46a3-b39a-7d298dec1f05" />

- Ticket confimation Email Notification
  <img width="1920" height="1403" alt="image" src="https://github.com/user-attachments/assets/37344a7e-aa45-4dbc-9c75-0ab738e14d07" />



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

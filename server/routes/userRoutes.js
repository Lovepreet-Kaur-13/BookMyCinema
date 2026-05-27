const express = require("express");
const {registerUser, loginUser, getCurrentUser, forgotPassword, resetPassword} = require("../controllers/userController");
const authMiddleware = require('../middlewares/authMiddleware');

const userRouter = express.Router();

userRouter.post("/register" , registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-current-user", authMiddleware, getCurrentUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);

module.exports = userRouter;
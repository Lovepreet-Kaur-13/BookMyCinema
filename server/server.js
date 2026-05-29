const express = require("express");

const app = express();

// LOAD env VARIABES to process.env
require("dotenv").config();

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");
const theatreRouter = require("./routes/theatreRoutes");
const showRouter = require("./routes/showRoutes");
const paymentRouter = require("./routes/paymentRoutes");
const bookingRouter = require("./routes/bookingRoutes");

// MIDDLEWARE TO PARSE JSON
app.use(express.json());

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max:100,
    message: "Too many requests from this IP, Please try again after 15 minutes",
})

app.use(helmet({
    crossOriginResourcePolicy: false
}));

// APPLY RATE LIMITER TO ALL REQUESTS
app.use("/api/", apiLimiter);

//ROUTES
app.use("/api/users" , userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/shows", showRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/bookings", bookingRouter);

connectDB();

const PORT = 8081;

app.listen( PORT, () =>{
    console.log(`Server is running at Port: ${PORT}`);
});
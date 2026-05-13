const express = require("express");

const app = express();

// LOAD env VARIABES to process.env
require("dotenv").config();

const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");
const theatreRouter = require("./routes/theatreRoutes");
const showRouter = require("./routes/showRoutes");

// MIDDLEWARE TO PARSE JSON
app.use(express.json());

//ROUTES
app.use("/api/users" , userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/shows", showRouter);

connectDB();

const PORT = 8081;

app.listen( PORT, () =>{
    console.log(`Server is running at Port: ${PORT}`);
});
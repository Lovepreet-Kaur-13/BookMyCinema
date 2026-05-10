const express = require("express");
const {addMovie, updateMovie, getAllMovies, deleteMovie } = require("../controllers/movieController");

const movieRouter = express.Router();

movieRouter.post("/add-movie", addMovie) ;
movieRouter.get("/get-all-movies", getAllMovies);
movieRouter.put("/update-movie/:id", updateMovie);
movieRouter.delete("/delete-movie/:id", deleteMovie);

module.exports = movieRouter;
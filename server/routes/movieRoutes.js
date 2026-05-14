const express = require("express");
const {addMovie, updateMovie, getAllMovies, deleteMovie, getMovieById } = require("../controllers/movieController");

const movieRouter = express.Router();

movieRouter.post("/add-movie", addMovie) ;
movieRouter.get("/get-all-movies", getAllMovies);
movieRouter.put("/update-movie/:id", updateMovie);
movieRouter.delete("/delete-movie/:id", deleteMovie);
movieRouter.get("/movie/:id", getMovieById);

module.exports = movieRouter;
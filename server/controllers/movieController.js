const Movie = require("../models/movieModel");

// add-movie

const addMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(201).send({
            success: true,
            message: "Movie added successfully"
        })

    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

const getAllMovies = async (req, res) => {
    try {
        const allMovies = await Movie.find();
        res.status(200).send({
            success: true,
            message: "All Movies have been fetched",
            data: allMovies
        })

    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }

}

const updateMovie = async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            success: true,
            message: "Movie updated Successfully"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);

        if (!movie) {
            return res.status(404).send({
                success: false,
                message: "Movie not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Movie deleted successfully"
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

module.exports = { addMovie, getAllMovies, updateMovie, deleteMovie };

const Show = require("../models/showModel");

// add-show 
const addShow = async (req, res) => {
    try {
        const newShow = new Show(req.body);
        await newShow.save();
        res.status(201).send({
            success: true,
            message: "New show has been added successfully"
        })

    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

// Get all shows by theatre
const getAllShowsByTheatre = async (req, res) => {
    try {
        const shows = await Show.find({ theatre: req.body.theatreId }).populate("movie");
        res.status(200).send({
            success: true,
            message: "All shows fetched",
            data: shows,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });

    }
}

const updateShow = async (req, res) => {
    try {
        const updatedShow = await Show.findByIdAndUpdate(req.body.showId, req.body, {new: true});
        res.status(200).send({
            success: true,
            message: "Show updated Successfully",
            data: updatedShow
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

const deleteShow = async (req, res) => {
    try {
        const show = await Show.findByIdAndDelete(req.body.showId);

        if (!show) {
            return res.status(404).send({
                success: false,
                message: "show not found"
            })
        }

        res.status(200).send({
            success: true,
            message: "Show has been deleted successfully"
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

const getAllTheatresByMovie = async (req, res) => {
    try {

        // Get all shows by theatre
        const { movie, date } = req.params;

        const shows = await Show.find({ movie, date })
            .populate("theatre");

        // Filter out unique theatres
        let uniqueTheatres = [];

        shows.forEach((show) => {

            let isTheatre = uniqueTheatres.find(
                (theatre) =>
                    theatre._id.toString() ===
                    show.theatre._id.toString()
            );

            if (!isTheatre) {

                let showsOfThisTheatre = shows.filter(
                    (showObj) =>
                        showObj.theatre._id.toString() ===
                        show.theatre._id.toString()
                );

                uniqueTheatres.push({
                    ...show.theatre._doc,
                    shows: showsOfThisTheatre,
                });
            }
        });

        res.status(200).send({
            success: true,
            message: "All theatres fetched!",
            data: uniqueTheatres,
        });

    } catch (error) {

        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
};

// Get show by ID
const getShowById = async (req, res) => {
    try {

        const { showId } = req.body;

        const show = await Show.findById(showId)
            .populate("movie")
            .populate("theatre");

        if (!show) {
            return res.status(404).send({
                success: false,
                message: "Show not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Show fetched!",
            data: show,
        });

    } catch (err) {

        res.status(500).send({
            success: false,
            message: err.message,
        });
    }
};


module.exports = { addShow, getAllShowsByTheatre, updateShow, deleteShow, getAllTheatresByMovie, getShowById };

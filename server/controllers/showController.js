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
            await Show.findByIdAndUpdate(req.body.showId, req.body);
            res.send({
                success: true,
                message: "Show updated Successfully"
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

            res.status(200).json({
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

module.exports = { addShow, getAllShowsByTheatre, updateShow, deleteShow };

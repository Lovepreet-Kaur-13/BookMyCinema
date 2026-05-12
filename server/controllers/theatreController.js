const Theatre = require("../models/theatreModel");

// add-theatre

const addTheatre = async (req, res) => {
    try {
        const newTheatre = new Theatre(req.body);
        await newTheatre.save();
        res.status(201).send({
            success: true,
            message: "New Theatre added successfully"
        })

    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

const getAllTheatres = async (req, res) => {
    try {
        const allTheatres = await Theatre.find().populate("owner");
        res.status(200).send({
            success: true,
            message: "All Theatres have been fetched",
            data: allTheatres
        })

    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }

}

const updateTheatre = async (req, res) => {
    try {
        await Theatre.findByIdAndUpdate(req.params.theatreId, req.body);
        res.send({
            success: true,
            message: "Theatre updated Successfully"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

const deleteTheatre = async (req, res) => {
    try {
        const theatre = await Theatre.findByIdAndDelete(req.params.theatreId);

        if (!theatre) {
            return res.status(404).send({
                success: false,
                message: "Theatre not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Theatre deleted successfully"
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}



module.exports = { addTheatre, getAllTheatres, updateTheatre, deleteTheatre };

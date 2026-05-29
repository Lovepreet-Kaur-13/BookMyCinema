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
        const shows = await Show.find({ theatre: req.body.theatreId }).
        populate("movie")
        .populate("theatre");
        
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
    const { movie, date } = req.body;
    const shows = await Show.find({ movie, date }).populate("theatre");
    let uniqueTheatre = [];
    shows.forEach((show) => {
      let isTheatre = uniqueTheatre.find(
        (theatre) => (theatre._id === show.theatre._id)
      );
      if (!isTheatre) {
        let showsOfThisTheatres = shows.filter(
          (showObj) => showObj.theatre._id === show.theatre._id
        );
        uniqueTheatre.push({
          ...show.theatre._doc,
          showsOfThisTheatres,
        });
      }
    });
    console.log(uniqueTheatre);
    res.send({
      success: true,
      message: "All Theatres are fetched",
      data: uniqueTheatre,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
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

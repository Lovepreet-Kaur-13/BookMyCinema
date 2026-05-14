const express = require("express");
const showRouter = express.Router();

const { addShow, getAllShowsByTheatre, updateShow, deleteShow, getAllTheatresByMovie, getShowById } = require("../controllers/showController");

// add show
showRouter.post("/add-show", addShow);

// get shows by theatre
showRouter.post("/get-all-shows-by-theatre", getAllShowsByTheatre);

// update show
showRouter.put("/update-show", updateShow);

// delete show
showRouter.delete("/delete-show", deleteShow);

showRouter.post("/get-all-theatres-by-movie", getAllTheatresByMovie );

showRouter.post("/get-show-by-id", getShowById);

module.exports = showRouter;
const express = require("express");
const showRouter = express.Router();

const { addShow, getAllShowsByTheatre, updateShow, deleteShow } = require("../controllers/showController");

// add show
showRouter.post("/add-show", addShow);

// get shows by theatre
showRouter.post("/get-all-shows-by-theatre", getAllShowsByTheatre);

// update show
showRouter.put("/update-show", updateShow);

// delete show
showRouter.delete("/delete-show", deleteShow);

module.exports = showRouter;
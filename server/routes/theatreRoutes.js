const express = require("express");

const { addTheatre, getAllTheatres, updateTheatre, deleteTheatre } = require("../controllers/theatreController");

const theatreRouter = express.Router();

theatreRouter.post("/add-theatre", addTheatre);
theatreRouter.get("/get-all-theatres", getAllTheatres);
theatreRouter.put("/update-theatre/:theatreId", updateTheatre);
theatreRouter.delete("/delete-theatre/:theatreId", deleteTheatre);


module.exports = theatreRouter;
const { seatBooking } = require("../controllers/bookingController");

const bookingRouter = require("express").Router();

bookingRouter.post("/seat-booking", seatBooking);


module.exports = bookingRouter;
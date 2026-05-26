const { seatBooking, getAllBookings } = require("../controllers/bookingController");

const bookingRouter = require("express").Router();

bookingRouter.post("/seat-booking", seatBooking);
bookingRouter.post("/get-all-bookings", getAllBookings);


module.exports = bookingRouter;
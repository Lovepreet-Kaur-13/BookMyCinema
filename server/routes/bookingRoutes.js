const { seatBooking, getAllBookings } = require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");


const bookingRouter = require("express").Router();

bookingRouter.post("/seat-booking", seatBooking);
bookingRouter.post("/get-all-bookings", authMiddleware, getAllBookings);


module.exports = bookingRouter;
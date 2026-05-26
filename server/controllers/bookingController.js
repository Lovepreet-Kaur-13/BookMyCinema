const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");

const seatBooking = async (req, res, next) => {
  try {
    const newBooking = new Booking(req.body);

    await newBooking.save();

    const show = await Show.findById(req.body.show);

    const updatedBookedSeats = [
      ...show.bookedSeats,
      ...req.body.seats,
    ];

    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: updatedBookedSeats,
    });

    res.send({
      success: true,
      message: "Payment Successful",
      data: newBooking,
    });
  } catch (error) {
    res.status(500);
    next(error);
  }
};

module.exports = { seatBooking };
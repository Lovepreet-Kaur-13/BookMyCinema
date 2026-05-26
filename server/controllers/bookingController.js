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

const getAllBookings = async (req, res, next) => {
  try {
    const userId = req.body.userId;

    const bookings = await Booking.find({ user: userId })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });
    res.send({
      success: true,
      message: "Bookings Fetched",
      data: bookings,
    });
  } catch (error) {
  return res.status(500).send({
    success: false,
    message: error.message,
  });
}
}

module.exports = { seatBooking, getAllBookings };
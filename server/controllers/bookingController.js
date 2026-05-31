const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");
const emailHelper = require("../utils/emailHelper");

const seatBooking = async (req, res, next) => {
  try {
    const allBookings = await Booking.find({ show: req.body.show });

    const bookedSeats = allBookings.flatMap(b => b.seats);

    const alreadyBooked = req.body.seats.some(seat =>
      bookedSeats.includes(seat)
    );

    if (alreadyBooked) {
      return res.send({
        success: false,
        message: "These seats are already booked",
      });
    }

    const newBooking = new Booking(req.body);
    await newBooking.save();

    const updatedBookedSeats = [
      ...new Set([...bookedSeats, ...req.body.seats])
    ];

    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: updatedBookedSeats,
    });

    const populatedBooking = await Booking.findById(newBooking._id)
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      });

    const dateObj = new Date(populatedBooking.show.date);

    const formattedDate = dateObj.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    const metaData = {
      name: populatedBooking.user.name,
      movie: populatedBooking.show.movie.title,
      theatre: populatedBooking.show.theatre.name,
      date: formattedDate,
      time: populatedBooking.show.time,
      seats: populatedBooking.seats,
      amount:
        populatedBooking.seats.length *
        populatedBooking.show.ticketPrice,
      transactionId: populatedBooking.transactionId,
    };

    //  SEND RESPONSE FIRST (FIX)
    res.send({
      success: true,
      message: "Payment Successful",
      data: newBooking,
    });

    // SEND EMAIL AFTER RESPONSE 
    setImmediate(async () => {
      try {
        await emailHelper(
          "ticketTemplate.html",
          populatedBooking.user.email,
          metaData
        );
      } catch (err) {
        console.log("Email failed:", err);
      }
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
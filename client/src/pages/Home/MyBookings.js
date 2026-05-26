import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { GetAllBookings } from "../../api/bookings";
import { Row, Col, Card, Button, message, Tag } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";


const MyBookings = () => {
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(ShowLoading());

      const response = await GetAllBookings(user._id);

      if (response.success) {
        setBookings(response.data);
      } else {
        message.warning(response.message);
      }
    } catch (err) {
      message.error(err.message);
    } finally {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="myBookingPage">
      {bookings.length > 0 ? (
        <Row gutter={[20, 20]}>
          {bookings.map((booking) => (
            <Col xs={24} md={12} key={booking._id}>
              <Card
                hoverable
                className="bookingCard"
                bodyStyle={{ padding: "22px" }}
              >
                <div className="cardContent">
                  <img
                    src={booking.show.movie.poster}
                    alt="poster"
                    className="poster"
                  />

                  <div style={{ flex: 1 }}>
                    <h2 className="movieTitle">
                      {booking.show.movie.title}
                    </h2>

                    <div className="details">
                      <p>
                        🎭 <b>Theatre:</b> {booking.show.theatre.name}
                      </p>

                      <p>
                        📅 <b>Date:</b>{" "}
                        {moment(booking.show.date).format("MMM Do YYYY")}
                      </p>

                      <p>
                        ⏰ <b>Time:</b>{" "}
                        {moment(booking.show.time, "HH:mm").format("hh:mm A")}
                      </p>

                      <p>
                        💺 <b>Seats:</b>{" "}
                        {booking.seats.map((seat) => (
                          <Tag color="blue" key={seat}>
                            {seat}
                          </Tag>
                        ))}
                      </p>

                      <p>
                        💰 <b>Amount:</b>{" "}
                        <span className="amount">
                          ₹{booking.seats.length * booking.show.ticketPrice}
                        </span>
                      </p>

                      <p>
                        🧾 <b>Booking ID:</b>{" "}
                        <span className="bookingId">
                          {booking.transactionId}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="emptyBookingContainer">
          <h2>No Bookings Yet</h2>
          <p>
            Looks like you haven't booked a movie yet.
          </p>

          <Link to="/">
            <Button type="primary" size="large">
              Start Booking
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
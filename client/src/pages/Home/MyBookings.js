import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { GetAllBookings } from "../../api/bookings";
import { Row, Col, Card, Button, message, Tag, Spin, Space } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen p-4 md:p-6 lg:p-8">
        <Spin size="large" />
        <p>Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      {bookings.length > 0 ? (
        <Row gutter={[16, 16]}>
          {bookings.map((booking) => (
            <Col xs={24} sm={12} md={8} key={booking._id}>

              <Card title={booking.show.movie.title} bordered={true}>

                <p><b>Theatre:</b> {booking.show.theatre.name}</p>

                <p>
                  <b>Date:</b>{" "}
                  {moment(booking.show.date).format("DD-MM-YYYY")}
                </p>

                <p>
                  <b>Time:</b>{" "}
                  {moment(booking.show.time, "HH:mm").format("hh:mm A")}
                </p>

                <p>
                  <b>Seats:</b>{" "}
                  <Space wrap>
                    {booking.seats.map((seat) => (
                      <Tag key={seat} color="red" style={{ fontWeight: 700 }}>
                        {seat}
                      </Tag>
                    ))}
                  </Space>
                </p>

                <p>
                  <b>Total Amount:</b> ₹
                  {booking.seats.length * booking.show.ticketPrice}
                </p>

                <p>
                  <b>Booking ID:</b> {booking.transactionId}
                </p>

              </Card>

            </Col>
          ))}
        </Row>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 text-center">
          <h2 >No Bookings Yet</h2>
          <p className="mb-4">You haven't booked any movies yet.</p>
          <Link to="/">
            <Button type="primary">Book Now</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
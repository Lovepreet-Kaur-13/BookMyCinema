import { useEffect, useState } from "react";
import { GetShowById } from "../../api/shows";
import { useNavigate, useParams } from "react-router-dom";
import { message, Card, Row, Col } from "antd";
import moment from "moment";


const BookShow = () => {
  const [show, setShow] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await GetShowById({
        showId: params.id,
      });

      if (response.success) {
        setShow(response.data);
        console.log(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Seat Calculations

  const rows = show?.theatre?.seatingLayout?.rows || 0;

  const columns = show?.theatre?.seatingLayout?.columns || 0;

  const totalSeats = rows * columns;

  const availableSeats = totalSeats - (show?.bookedSeats?.length || 0);

  // Seat Layout

  const getSeats = () => {
    return (
      <div className="seat-main-container">

        {/* Screen */}
        <div className="screen-container">
          <p className="screen-text">
            Screen this side, you will be
            watching in this direction
          </p>

          <div className="screen-div"></div>
        </div>

        {/* Seats */}
        <div className="seat-container">
          {Array.from(Array(rows).keys()).map((row) => {
            return (
              <div
                className="seat-row"
                key={row}
              >
                {Array.from(Array(columns).keys()).map((column) => {
                  const seatNumber = row * columns + column + 1;

                  let seatClass = "seat-btn";
                  // Selected Seats
                  if (selectedSeats.includes(seatNumber)) {
                    seatClass += " selected";
                  }

                  // Booked Seats
                  if (show?.bookedSeats?.includes(seatNumber)) {
                    seatClass += " booked";
                  }

                  return (
                    <button
                      key={seatNumber}
                      disabled={show?.bookedSeats?.includes(seatNumber)}
                      className={seatClass}
                      onClick={() => {

                        if (selectedSeats.includes(seatNumber)) {
                          setSelectedSeats(
                            selectedSeats.filter(
                              (curSeatNumber) => curSeatNumber !== seatNumber
                            )
                          );

                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]);
                        }
                      }}
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
            );
          }
          )}
        </div>

        {/* Booking Summary */}
        <div className="bottom-card">

          <div >
            Selected Seats:
            <span>
              {" "}
              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "None"}
            </span>
          </div>

          <div >
            Total Price:
            <span>
              {" "}
              Rs.{" "}
              {selectedSeats.length *
                show.ticketPrice}
            </span>
          </div>

        </div>
      </div>
    );
  };

  return (
    <>
      {show && (
        <Row gutter={24}>
          <Col span={24}>
            <Card
              style={{ width: "100%" }}

              title={
                <div className="movie-title-details">
                  <h1>
                    {show.movie.title}
                  </h1>

                  <p>
                    Theatre:{" "}
                    {show.theatre.name},{" "}
                    {
                      show.theatre.address
                    }
                  </p>
                </div>
              }

              extra={
                <div >

                  <h3>
                    <span>
                      Show Name:
                    </span>{" "}
                    {show.name}
                  </h3>

                  <h3>
                    <span> Date & Time:</span>{" "}
                    {moment(show.date).format("MMM Do YYYY")}{" "}at{" "}
                    {moment(show.time, "HH:mm").format("hh:mm A")}
                  </h3>

                  <h3>
                    <span>Ticket Price:</span>{" "}Rs.{" "}{show.ticketPrice} only /-
                  </h3>

                  <h3>
                    <span>Total Seats:</span>{" "}{totalSeats}

                    <span>
                      {" "}&nbsp;|&nbsp; Available Seats: </span>{" "} {availableSeats}
                  </h3>

                </div>
              }
            >
              {getSeats()}
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default BookShow;
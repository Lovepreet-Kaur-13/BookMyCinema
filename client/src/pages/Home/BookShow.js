import { useEffect, useState } from "react";
import { GetShowById } from "../../api/shows";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { message, Card, Row, Col, Button, Modal } from "antd";
import moment from "moment";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { MakePayment } from "../../api/payments";


const BookShow = () => {
  const [show, setShow] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!stripe || !elements) {
      message.warning("Stripe not loaded yet.");
      return;
    }

    if (selectedSeats.length === 0) {
      message.warning("Please select seats.");
      return;
    }

    try {
      setIsProcessing(true);
      dispatch(ShowLoading());

      const payload = {
        amount: selectedSeats.length * show.ticketPrice * 100,
        description: `${show.movie.title} - ${selectedSeats.length} tickets`,
        userId: user._id,
      };

      const response = await MakePayment(payload);

      if (!response.success) {
        message.error(response.message);
        setIsProcessing(false);
        dispatch(HideLoading());
        return;
      }

      const clientSecret =
        response.clientSecret || response.data?.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        message.error(result.error.message);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        message.success("Payment successful!");
        navigate("/profile");
      }
    } catch (err) {
      console.error(err);
      message.error(err.message || "Payment failed");
    } finally {
      setIsProcessing(false);
      dispatch(HideLoading());
    }
  };

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
        <Button className="payment-button"
          shape="round"
          size="large"
          block
          disabled={selectedSeats.length === 0}
          onClick={() => setIsModalOpen(true)}
          type={selectedSeats.length === 0 ? "default" : "primary"}
        >
          Pay Now
        </Button>
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
                  <h2>
                    {show.movie.title}
                  </h2>
                  <p>
                    Theatre:{" "}
                    {show.theatre.name},{" "} {show.theatre.address}
                  </p>
                </div>
              }
              extra={
                <div >
                  <h3 style={{ color: "darkblue" }}>
                    {show.name}
                  </h3>


                  <p><span> Date & Time:</span>{" "}
                    {moment(show.date).format("MMM Do YYYY")}{" "}at{" "}
                    {moment(show.time, "HH:mm").format("hh:mm A")}
                  </p>
                  <p>
                    <span>Ticket Price:</span>{" "}Rs.{" "}{show.ticketPrice} only /-
                  </p>

                  <span>Total Seats:</span>{" "}{totalSeats}

                  <span>
                    {" "}&nbsp;|&nbsp; Available Seats: </span>{" "} {availableSeats}

                </div>
              }
            >
              {getSeats()}


            </Card>
          </Col>
        </Row>
      )}
      <Modal
        title="Test Payment"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <h3>
          Total Amount: ₹
          {selectedSeats.length * (show?.ticketPrice || 0)}
        </h3>

        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
              },
            },
          }}
        />

        <Button
          type="primary"
          block
          style={{ marginTop: "20px" }}
          onClick={handlePayment}
          loading={isProcessing}
          disabled={!stripe || isProcessing}
        >
          Pay Now
        </Button>
      </Modal>
    </>
  );
};

export default BookShow;
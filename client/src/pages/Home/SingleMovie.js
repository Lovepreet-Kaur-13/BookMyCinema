import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetMovieById } from "../../api/movies";
import { message, Input, Divider, Row, Col, Card, Tag, Button } from "antd";
import { GetAllTheatresByMovie } from "../../api/shows";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Table, Space } from "antd";

function SingleMovie() {
    const [movie, setMovie] = useState(null);
    const [theatres, setTheatres] = useState([]);
    const [bookingMode, setBookingMode] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

    const handleDate = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    getAllTheatres(selectedDate);
};

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetMovieById(params.id);
            if (response.success) {
                setMovie(response.data);
            } else {
                message.error(response.message);
            }
        } catch (err) {
            message.error(err.message);
        } finally {
            dispatch(HideLoading());
        }
    };

    const getAllTheatres = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllTheatresByMovie({
                movie: params.id,
                date,
            });
            console.log(response);

            if (response.success) {
                setTheatres(response.data);
            } else {
                message.error(response.message);
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

    // fetch only when booking started
    useEffect(() => {
        if (!bookingMode) return;
        getAllTheatres(date);
        
    }, [bookingMode, date]);

    const durationFormat = (duration) => {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;

        return `${hours}h ${minutes}m`;
    };

    const columns = [
        {
            title: "Theatres Name",
            dataIndex: "name",
            key: "name",
            render: (text, theatre) => (
                <div>
                    <h3 style={{ margin: 0 }}>{theatre.name}</h3>
                    <p style={{ margin: 0, color: "#888" }}>{theatre.address}</p>
                </div>
            ),
        },
        {
            title: "Show Timing",
            key: "shows",
            render: (_, theatre) => (
                <Space wrap>
                    {theatre.showsOfThisTheatres
                        .sort(
                            (a, b) =>
                                moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                        )
                        .map((show) => (
                            <Button
                                key={show._id}
                                type="primary"
                                size="small"
                                ghost
                                onClick={() => navigate(`/book-show/${show._id}`)}
                                style={{ borderRadius: 20 }}
                            >
                                {moment(show.time, "HH:mm").format("hh:mm A")}
                            </Button>
                        ))}
                </Space>
            ),
        },
    ];
    return (
        <div className="inner-container">

            {/* MOVIE SECTION */}
            {movie && (
                <Card
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    }}
                    bodyStyle={{
                        display: "flex",
                        gap: 20,

                    }}
                >
                    {/* POSTER */}
                    <img
                        src={movie.poster}
                        alt="poster"
                        style={{
                            width: 200,
                            height: 300,
                            objectFit: "cover",
                            borderRadius: 12,
                        }}
                    />

                    {/* DETAILS */}
                    <div style={{ flex: 1 }}>

                        <h2 style={{ marginBottom: 5 }}>{movie.title}</h2>

                        <p>
                            <b>Genre:</b> {movie.genre}
                        </p>
                        <p>
                            <b>Release Date:</b>{" "}
                            {moment(movie.releaseDate).format("YYYY-MM-DD")}
                        </p>
                        <p>
                            <b>Duration:</b> {durationFormat(movie.duration)}
                        </p>

                        <Divider />

                        {/* TAGS */}
                        <div style={{ marginBottom: 15 }}>
                            <Tag color="blue">{movie.language}</Tag>
                        </div>

                        {/* BOOKING */}
                        {!bookingMode ? (
                            <Button
                                type="primary"
                                danger
                                onClick={() => setBookingMode(true)}
                            >
                                🎟 Book Tickets
                            </Button>
                        ) : (
                            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                <span>Select Date:</span>

                                <Input
                                    type="date"
                                    value={date}
                                    onChange={handleDate}
                                    min={moment().format("YYYY-MM-DD")}
                                    style={{ width: 200 }}
                                />
                            </div>
                        )}

                    </div>
                </Card>
            )}

            {/* ================= EMPTY STATE ================= */}
            {bookingMode && theatres.length === 0 && (
                <Card style={{ marginTop: 20, textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", }}>
                    <h3>No shows available for this date</h3>
                </Card>
            )}

            {/* ================= THEATRES ================= */}
            {theatres.length > 0 && (
                <div style={{ marginTop: 20 }}>
                    <h2 style={{ padding: "10px" }}>Available Theatres</h2>
                    <Table
                        dataSource={theatres}
                        columns={columns}
                        rowKey="_id"
                        pagination={false}
                    />
                </div>
            )}

        </div>

    );
}
export default SingleMovie;
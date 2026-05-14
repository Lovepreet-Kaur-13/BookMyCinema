import {
    Col,
    Modal,
    Row,
    Form,
    Input,
    Button,
    Select,
    Table,
    message,
} from "antd";

import {
    ArrowLeftOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import { ShowLoading, HideLoading } from "../../redux/loaderSlice";

import { GetAllMovies } from "../../api/movies";

import {
    AddShow,
    DeleteShow,
    GetShowsByTheatre,
    UpdateShow,
} from "../../api/shows";

const ShowModal = ({
    isShowModalOpen,
    setIsShowModalOpen,
    selectedTheatre,
}) => {
    const [view, setView] = useState("table");
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([]);
    const [selectedShow, setSelectedShow] = useState(null);

    const dispatch = useDispatch();

    // ================= GET DATA =================
    const getData = async () => {
        try {
            dispatch(ShowLoading());

            const movieResponse = await GetAllMovies();

            if (movieResponse.success) {
                setMovies(movieResponse.data);
            } else {
                message.error(movieResponse.message);
            }

            const showResponse = await GetShowsByTheatre({
                theatreId: selectedTheatre._id,
            });

            if (showResponse.success) {
                setShows(showResponse.data);
            } else {
                message.error(showResponse.message);
            }

            dispatch(HideLoading());

        } catch (err) {
            dispatch(HideLoading());
            message.error(err.message);
        }
    };

    // ================= ADD / UPDATE =================
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());

            let response = null;

            if (view === "form") {
                response = await AddShow({
                    ...values,
                    theatre: selectedTheatre._id,
                });
            } else {
                response = await UpdateShow({
                    ...values,
                    showId: selectedShow._id,
                    theatre: selectedTheatre._id,
                });
            }

            if (response.success) {
                message.success(response.message);

                getData();

                setView("table");
                setSelectedShow(null);
            } else {
                message.error(response.message);
            }

            dispatch(HideLoading());

        } catch (err) {
            dispatch(HideLoading());
            message.error(err.message);
        }
    };

    // ================= DELETE =================
    const handleDelete = async (showId) => {
        try {
            dispatch(ShowLoading());

            const response = await DeleteShow({ showId });

            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message);
            }

            dispatch(HideLoading());

        } catch (err) {
            dispatch(HideLoading());
            message.error(err.message);
        }
    };

    // ================= TABLE COLUMNS =================
    const columns = [
        {
            title: "Show Name",
            dataIndex: "name",
        },
        {
            title: "Show Date",
            dataIndex: "date",
            render: (text) =>
                moment(text).format("MMM Do YYYY"),
        },
        {
            title: "Show Time",
            dataIndex: "time",
            render: (text) =>
                moment(text, "HH:mm").format("hh:mm A"),
        },
        {
            title: "Movie",
            render: (_, data) => data.movie.title,
        },
        {
            title: "Ticket Price",
            dataIndex: "ticketPrice",
        },
        {
            title: "Total Seats",
            dataIndex: "totalSeats",
        },
        {
            title: "Available Seats",
            render: (_, data) =>
                data.totalSeats - data.bookedSeats.length,
        },
        {
            title: "Action",
            render: (_, data) => (
                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                    }}
                >
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setView("edit");

                            setSelectedShow({
                                ...data,
                                movie: data.movie._id,
                                date: moment(data.date).format(
                                    "YYYY-MM-DD"
                                ),
                            });
                        }}
                    />

                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() =>
                            handleDelete(data._id)
                        }
                    />
                </div>
            ),
        },
    ];

    // ================= EFFECT =================
    useEffect(() => {
        if (selectedTheatre?._id) {
            getData();
        }
    }, [selectedTheatre]);

    // ================= CLOSE =================
    const handleCancel = () => {
        setIsShowModalOpen(false);
        setView("table");
        setSelectedShow(null);
    };

    return (
        <Modal
            centered
            open={isShowModalOpen}
            onCancel={handleCancel}
            footer={null}
            width={1000}
            destroyOnClose
            title={
                view === "table"
                    ? `🎬 ${selectedTheatre?.name} Shows`
                    : view === "form"
                        ? "🎭 Add Show"
                        : "✏️ Edit Show"
            }
        >
            {/* TABLE VIEW */}
            {view === "table" && (
                <>
                    {/* HEADER */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginBottom: "20px",
                        }}
                    >
                        <Button
                            type="primary"
                            onClick={() => setView("form")}
                        >
                            Add Show
                        </Button>
                    </div>

                    {/* TABLE */}
                    <Table
                        dataSource={shows}
                        columns={columns}
                        pagination={{ pageSize: 5 }}
                        bordered
                        rowKey="_id"
                    />
                </>
            )}

            {/* FORM VIEW */}
            {(view === "form" || view === "edit") && (
                <Form
                    layout="vertical"
                    style={{ width: "100%" }}
                    initialValues={
                        view === "edit"
                            ? selectedShow
                            : null
                    }
                    onFinish={onFinish}
                >
                    {/* ROW 1 */}
                    <Row gutter={16}>
                        <Col xs={24} md={8}>
                            <Form.Item
                                label="Show Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Required!",
                                    },
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Enter show name"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                label="Show Date"
                                name="date"
                                rules={[
                                    {
                                        required: true,
                                        message: "Required!",
                                    },
                                ]}
                            >
                                <Input
                                    type="date"
                                    size="large"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                label="Show Time"
                                name="time"
                                rules={[
                                    {
                                        required: true,
                                        message: "Required!",
                                    },
                                ]}
                            >
                                <Input
                                    type="time"
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* ROW 2 */}
                    <Row gutter={16}>
                        <Col xs={24} md={8}>
                            <Form.Item
                                label="Movie"
                                name="movie"
                                rules={[
                                    {
                                        required: true,
                                        message: "Required!",
                                    },
                                ]}
                            >
                                <Select
                                    size="large"
                                    placeholder="Select movie"
                                    options={movies.map(
                                        (movie) => ({
                                            value: movie._id,
                                            label: movie.title,
                                        })
                                    )}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                label="Ticket Price"
                                name="ticketPrice"
                                rules={[
                                    {
                                        required: true,
                                        message: "Required!",
                                    },
                                ]}
                            >
                                <Input
                                    type="number"
                                    size="large"
                                    placeholder="Enter ticket price"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                label="Total Seats"
                                name="totalSeats"
                                rules={[
                                    {
                                        required: true,
                                        message: "Required!",
                                    },
                                ]}
                            >
                                <Input
                                    type="number"
                                    size="large"
                                    placeholder="Enter total seats"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* BUTTONS */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "10px",
                            marginTop: "20px",
                            borderTop: "1px solid #f0f0f0",
                            paddingTop: "15px",
                        }}
                    >
                        <Button
                            onClick={() => {
                                setView("table");
                                setSelectedShow(null);
                            }}
                        >
                            <ArrowLeftOutlined />
                            Go Back
                        </Button>

                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            {view === "form"
                                ? "Add Show"
                                : "Update Show"}
                        </Button>
                    </div>
                </Form>
            )}
        </Modal>
    );
};

export default ShowModal;
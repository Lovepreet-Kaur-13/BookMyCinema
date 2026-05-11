import React, { useEffect } from "react";
import { Modal, Form, Input, Select, message, Row, Col, Button } from "antd";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { AddMovie, UpdateMovie } from "../../api/movies";
import moment from "moment";

const { TextArea } = Input;

const MovieForm = ({
    isModalOpen,
    setIsModalOpen,
    selectedMovie,
    setSelectedMovie,
    formType,
    getData,
}) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        if (selectedMovie) {
            form.setFieldsValue({
                ...selectedMovie,
                releaseDate: selectedMovie.releaseDate
                    ? moment(selectedMovie.releaseDate).format("YYYY-MM-DD")
                    : "",
            });
        } else {
            form.resetFields();
        }
    }, [selectedMovie, form]);

 
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());

            let response;

            if (formType === "add") {
                response = await AddMovie(values);
            } else {
                response = await UpdateMovie({
                    ...values,
                    movieId: selectedMovie._id,
                });
            }

            if (response.success) {
                message.success(response.message);
                getData();
                setIsModalOpen(false);
                setSelectedMovie(null);
                form.resetFields();
            } else {
                message.error(response.message);
            }

            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

   
    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
        form.resetFields();
    };

    return (
        <Modal
            centered
            title={formType === "add" ? "🎬 Add Movie" : "✏️ Edit Movie"}
            open={isModalOpen}
            onCancel={handleCancel}
            width={850}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{ marginTop: 10 }}
            >
                {/* MOVIE NAME */}
                <Form.Item
                    label="Movie Name"
                    name="title"
                    rules={[{ required: true, message: "Movie name is required!" }]}
                >
                    <Input size="large" placeholder="Enter movie name" />
                </Form.Item>

                {/* DESCRIPTION */}
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: "Description is required!" }]}
                >
                    <TextArea rows={3} placeholder="Enter description" />
                </Form.Item>

                {/* ROW 1 */}
                <Row gutter={16}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Duration (mins)"
                            name="duration"
                            rules={[{ required: true }]}
                        >
                            <Input type="number" size="large" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Language"
                            name="language"
                            rules={[{ required: true }]}
                        >
                            <Select
                                size="large"
                                placeholder="Select language"
                                options={[
                                    { value: "English" },
                                    { value: "Hindi" },
                                    { value: "Punjabi" },
                                ]}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Release Date"
                            name="releaseDate"
                            rules={[{ required: true }]}
                        >
                            <Input type="date" size="large" />
                        </Form.Item>
                    </Col>
                </Row>

                {/* ROW 2 */}
                <Row gutter={16}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Genre"
                            name="genre"
                            rules={[{ required: true }]}
                        >
                            <Select
                                size="large"
                                placeholder="Select genre"
                                options={[
                                    { value: "Action" },
                                    { value: "Comedy" },
                                    { value: "Horror" },
                                    { value: "Thriller" },
                                ]}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={16}>
                        <Form.Item
                            label="Poster URL"
                            name="poster"
                            rules={[{ required: true, message: "Poster is required!" }]}
                        >
                            <Input size="large" placeholder="Enter poster URL" />
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
                    <Button onClick={handleCancel}>
                        Cancel
                    </Button>

                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            backgroundColor: "#52c41a",
                            borderColor: "#52c41a",
                            fontWeight: 600,
                            padding: "0 25px",
                        }}
                    >
                        {formType === "add" ? "Add Movie" : "Update Movie"}
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default MovieForm;
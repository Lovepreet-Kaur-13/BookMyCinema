import React, { useEffect } from "react";
import { Modal, Form, Input, message, Row, Col, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { AddTheatre, UpdateTheatre } from "../../api/theatres";

const TheatreForm = ({
    isModalOpen,
    setIsModalOpen,
    selectedTheatre,
    setSelectedTheatre,
    formType,
    getData,
}) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.users);
    const [form] = Form.useForm();

    // set values for edit
    useEffect(() => {
        if (selectedTheatre) {
            form.setFieldsValue({
                name: selectedTheatre.name,
                address: selectedTheatre.address,
                phone: selectedTheatre.phone,
                email: selectedTheatre.email
            });
        } else {
            form.resetFields();
        }
    }, [selectedTheatre, form]);

    // submit
    const onFinish = async (values) => {
        console.log("FORM VALUES:", values);
        console.log("SELECTED THEATRE:", selectedTheatre);
        try {
            dispatch(ShowLoading());

            let response;

            if (formType === "add") {
                response = await AddTheatre({
                    ...values,
                    owner: user._id,
                });
            } else {
                response = await UpdateTheatre({
                    ...values,
                    theatreId: selectedTheatre._id,
                });
            }

            if (response.success) {
                message.success(response.message);
                getData();
                resetForm();
            } else {
                message.error(response.message);
            }

        } catch (error) {
            message.error(error.message);

        } finally {
            dispatch(HideLoading());
        }
    };

    // FORM REST FUNCTION
    const resetForm = () => {
        setIsModalOpen(false);
        setSelectedTheatre(null);
        form.resetFields();
    };

    return (
        <Modal
            centered
            title={formType === "add" ? "🎭 Add Theatre" : "✏️ Edit Theatre"}
            open={isModalOpen}
            onCancel={() => {
                setIsModalOpen(false);
                setSelectedTheatre(null);
            }}
            width={800}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>

                {/* THEATRE NAME */}
                <Form.Item
                    label="Theatre Name"
                    name="name"
                    rules={[{ required: true, message: "Required!" }]}
                >
                    <Input size="large" placeholder="Enter theatre name" />
                </Form.Item>

                {/* ADDRESS */}
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: "Required!" }]}
                >
                    <Input.TextArea rows={3} placeholder="Enter address" />
                </Form.Item>

                {/* ROW 1 */}
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Phone Number"
                            name="phone"
                            rules={[{ required: true, message: "Required!" }]}
                        >
                            <Input size="large" placeholder="Enter phone number" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Required!" },
                                { type: "email", message: "Invalid email!" },
                            ]}
                        >
                            <Input size="large" placeholder="Enter email" />
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
                        onClick={resetForm}
                    >
                        Cancel
                    </Button>

                    <Button type="primary" htmlType="submit">
                        {formType === "add" ? "Add Theatre" : "Update Theatre"}
                    </Button>
                </div>

            </Form>
        </Modal>
    );
};

export default TheatreForm;
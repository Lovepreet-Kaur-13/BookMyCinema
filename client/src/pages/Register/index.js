import { Form, Input, Button, message, Radio } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../api/users";

const Register = () => {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const response = await RegisterUser(values);
            if (response.success) {
                message.success(response.message);
                navigate("/login");
            }
            else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">
                    Register to BookMyCinema
                </h2>
                <Form layout="vertical"
                    onFinish={onFinish}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Name is required" }]}
                    >
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your Name">
                        </Input>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Email is required" }]}
                    >
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email">
                        </Input>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Password is required" }]}
                    >
                        <Input.Password
                            id="password"
                            placeholder="Enter your Password">
                        </Input.Password>
                    </Form.Item>
                    <Form.Item
                        label="Register as a Partner"
                        name="role"
                        initialValue="user"
                        rules={[{ required: true, message: "Please select an option!" }]}
                    >
                        <Radio.Group>
                            <Radio value="partner">Yes</Radio>
                            <Radio value="user">No</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item className="d-block">
                        <Button type="primary"
                            block
                            htmlType="submit"
                            style={{ fontSize: "1rem", fontWeight: 600, padding: "18px" }}
                        >Register
                        </Button>
                    </Form.Item>
                    <div className="auth-footer">
                        Already have an account? <Link to="/login">Login here</Link>
                    </div>
                </Form>
            </div>

        </div>

    )
}

export default Register;
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../api/users";


const Login = () => {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const response = await LoginUser(values);
            if (response.success) {
                message.success(response.message);
                localStorage.setItem("token", response.data);
                navigate("/");
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
                    Login to BookMyCinema
                </h2>
                <Form layout="vertical"
                    onFinish={onFinish}>
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
                    <Form.Item className="d-block">
                        <Button type="primary"
                            block
                            htmlType="submit"
                            style={{ fontSize: "1rem", fontWeight: 600, padding: "18px" }}
                        >Login
                        </Button>
                    </Form.Item>
                    <div className="auth-footer">
                        New User? <Link to="/register">Register Here</Link>
                    </div>
                    <div className="auth-footer">
                        Forgot Password ? <Link to="/forgot-password">Click Here</Link>
                    </div>
                </Form>
            </div>

        </div>

    )
}

export default Login;
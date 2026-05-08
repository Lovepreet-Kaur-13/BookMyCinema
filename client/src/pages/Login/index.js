import {Form, Input, Button } from "antd";
import { Link } from "react-router-dom";

const Login = () =>{
      return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">
                    Login to BookMyCinema
                </h2>
                <Form layout="vertical">
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
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your Password">
                        </Input>
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
                        New User? <Link to="/register">Register here</Link>
                    </div>
                </Form>
            </div>

        </div>

    )
}

export default Login;
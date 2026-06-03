import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../api/users";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const response = await LoginUser(values);

      if (response.success) {
        message.success(response.message);

        localStorage.setItem("token", response.data);

        navigate("/home");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(
        error?.response?.data?.message || error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Login to BookMyCinema</h2>

        <Form layout="vertical" onFinish={onFinish} size="large">
          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input id="email" placeholder="Enter your email" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password
              id="password"
              placeholder="Enter your password"
            />
          </Form.Item>

          {/* Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>

          {/* Links */}
          <div className="auth-footer">
            New User? <Link to="/register">Register Here</Link>
          </div>

          <div className="auth-footer">
            Forgot Password? <Link to="/forgot-password">Click Here</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
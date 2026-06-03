import { useState } from "react";
import { Form, Input, Button, message, Radio } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../api/users";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const response = await RegisterUser(values);

      if (response.success) {
        message.success(response.message);
        navigate("/login");
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
        <h2 className="auth-title">Register to BookMyCinema</h2>

        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ role: "user" }}
          size="large"
        >
          {/* Name */}
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Name is required" },
            ]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password is required" },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          {/* Role */}
          <Form.Item
            label="Register as a Partner"
            name="role"
            rules={[
              { required: true, message: "Please select an option!" },
            ]}
          >
            <Radio.Group className="role-radio">
              <Radio value="partner">Yes</Radio>
              <Radio value="user">No</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <Button type="primary" block htmlType="submit" loading={loading}>
              Register
            </Button>
          </Form.Item>

          {/* Footer */}
          <div className="auth-footer">
            Already have an account?{" "}
            <Link to="/login">Login here</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
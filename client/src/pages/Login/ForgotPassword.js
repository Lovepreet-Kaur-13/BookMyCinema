import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { ForgotPasswrd } from "../../api/users";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());

      const response = await ForgotPasswrd(values);

      if (response.success) {
        message.success(response.message);
        alert("OTP sent to your email");
        navigate("/reset-password");
      } else {
        if (response.message === "Please use otp sent on mail") {
          message.warning("Please use existing otp");
          navigate("/reset-password");
        } else {
          message.warning(response.message);
        }
      }
    } catch (error) {
      message.error(error?.message || "Something went wrong");
    } finally {
      dispatch(HideLoading());
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h2 className="auth-title">Forgot Password</h2>

        <Form layout="vertical" onFinish={onFinish} size="large">
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

          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Send OTP
            </Button>
          </Form.Item>
        </Form>

        <div className="auth-footer">
          Existing User? <Link to="/login">Login Here</Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;





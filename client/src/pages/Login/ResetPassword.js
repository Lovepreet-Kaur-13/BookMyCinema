import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { ResetPasswrd } from "../../api/users";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      return message.error("Passwords do not match");
    }

    try {
      dispatch(ShowLoading());
      const response = await ResetPasswrd(values);
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.warning(response.message);
        navigate("/forgot-password");
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(HideLoading());
    }
  };
  return (
    <>
      <div className="auth-page">
        <div className="auth-card">
          <h1 className="auth-title">Reset Password</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="OTP"
              htmlFor="otp"
              name="otp"
              className="d-block"
              rules={[{ required: true, message: "OTP is required" }]}
            >
              <Input
                id="otp"
                type="number"
                placeholder="Enter your OTP"
              ></Input>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password
                id="password"
                type="password"
                placeholder="Enter New Password"
              ></Input.Password>
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              className="d-block"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password
                id="password"
                type="password"
                placeholder="Confirm Password"
              ></Input.Password>
            </Form.Item>
            <Form.Item className="d-block">
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600", padding: "18px" }}
              >
                RESET PASSWORD
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
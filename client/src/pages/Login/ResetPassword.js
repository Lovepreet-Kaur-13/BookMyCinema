import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
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
      message.error(error?.message || "Something went wrong");
    } finally {
      dispatch(HideLoading());
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h2 className="auth-title">Reset Password</h2>

        <Form layout="vertical" onFinish={onFinish} size="large">

          {/* OTP */}
          <Form.Item
            label="OTP"
            name="otp"
            rules={[
              { required: true, message: "OTP is required" },
            ]}
          >
            <Input placeholder="Enter your OTP" />
          </Form.Item>

          {/* New Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password is required" },
            ]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm password" },
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <Button type="primary" block htmlType="submit">
              RESET PASSWORD
            </Button>
          </Form.Item>

        </Form>

      </div>
    </div>
  );
};

export default ResetPassword;
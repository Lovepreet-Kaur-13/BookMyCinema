import React from 'react'
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
      message.error(error.message);
    } finally {
      dispatch(HideLoading());
    }
  };
  return (
    <>
      <div className="auth-page">
        <div className="auth-card">  
            <h2 className="auth-title">Forget Password</h2>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Email"
                htmlFor="email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your Email"
                ></Input>
              </Form.Item>

              <Form.Item className="d-block">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600", padding: "18px"}}
                >
                  Send OTP
                </Button>
              </Form.Item>
            </Form>
            <div className="auth-footer">
              Existing User? <Link to="/login">Login Here</Link>
            </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;






import React, { useEffect } from "react";
import { GetCurrentUser } from "../api/users";
import { SetUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";
import {
  HomeOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getValidUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetCurrentUser();
      dispatch(SetUser(response.data));
      dispatch(HideLoading());
    } catch (error) {
      console.log(error);
      dispatch(HideLoading());
      localStorage.removeItem("token");
      dispatch(SetUser(null));
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) getValidUser();
    else navigate("/login");
  }, []);

  if (role && user && user.role !== role) {
    return <h2 style={{ padding: 20 }}>Access Denied</h2>;
  }

  const handleMenuClick = (item) => {
    const key = item.key;

    if (key === "home") {
      if (user?.role === "admin") navigate("/admin");
      else if (user?.role === "partner") navigate("/partner");
      else navigate("/home");
    }

    if (key === "bookings") navigate("/my-bookings");
    if (key === "profile") navigate("/profile");

    if (key === "logout") {
      localStorage.removeItem("token");
      dispatch(SetUser(null));
      navigate("/");
    }
  };

  const navItems = [
    {
      key: "home",
      label:
        user?.role === "admin"
          ? "Movie Management"
          : user?.role === "partner"
          ? "Theatre Management"
          : "Home",
      icon: <HomeOutlined />,
    },
    {
      key: "profile",
      label:
        user?.role === "admin"
          ? "Admin Profile"
          : user?.role === "partner"
          ? "Partner Profile"
          : "User Profile",
      icon: <ProfileOutlined />,
    },
    ...(user?.role === "user"
      ? [
          {
            key: "bookings",
            label: "My Bookings",
            icon: <ProfileOutlined />,
          },
        ]
      : []),
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
    },
  ];

  const { Header, Footer } = Layout;

  return (
    user && (
      <Layout className="app-layout">

        <Header className="app-header">
          <div className="logo" onClick={() => navigate("/home")}>
            Book My Cinema
          </div>

          <Menu
            theme="dark"
            mode="horizontal"
            items={navItems}
            onClick={handleMenuClick}
            className="app-menu"
          />
        </Header>

        <div className="app-content">{children}</div>

        <Footer className="app-footer">
          © 2026 Book My Cinema | Created By Lovepreet Kaur Khela
        </Footer>
      </Layout>
    )
  );
};

export default ProtectedRoute;
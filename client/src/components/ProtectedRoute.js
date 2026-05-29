import React, { useEffect } from "react";
import { GetCurrentUser } from "../api/users";
import { SetUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
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

    // Validate user 
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
        if (token) {
            getValidUser();
        } else {
            navigate("/login");
        }
    }, []);

    //  Role protection
    if (role && user && user.role !== role) {
        return <h2 style={{ padding: 20 }}>Access Denied</h2>;
    }

    const handleMenuClick = (item) => {
        const key = item.key;

        if (key === "home") {
            if (user?.role === "admin") navigate("/admin");
            else if (user?.role === "partner") navigate("/partner");
            else navigate("/");
        }

        if (key == "bookings") navigate("/my-bookings");

        if (key === "profile") navigate("/profile");

        if (key === "logout") {
            localStorage.removeItem("token");
            dispatch(SetUser(null));
            navigate("/login");
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
        // Show only for users
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

    const { Header } = Layout;

    return (
        user && (
            <Layout>
                <Header
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <h3
                        style={{ color: "white", margin: 0, cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        Book My Cinema
                    </h3>

                    <Menu
                        theme="dark"
                        mode="horizontal"
                        items={navItems}
                        onClick={handleMenuClick}
                        style={{
                            minWidth: "250px",
                            flex: 1,
                            justifyContent: "flex-end",
                        }}
                    />
                </Header>

                <div style={{ padding: 20, minHeight: 380, background: "#fff" }}>
                    {children}
                </div>
            </Layout>
        )
    );
};

export default ProtectedRoute;
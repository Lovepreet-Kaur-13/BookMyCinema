import React, { useEffect } from "react";
import { GetCurrentUser } from "../api/users";
import { SetUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";
import { HomeOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';


const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(state => state.users);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navItems = [
        {
            key: "home",
            label: "Home",
            icon: <HomeOutlined />
        },
        {
            key: "user",
            label: `${user ? user.name : ""}`,
            icon: <UserOutlined />,
            children: [
                {
                    key: "profile",
                    label: (<span onClick={() => {
                        if (user.role === "admin") {
                            navigate("/admin")
                        }
                        else if (user.role === "partner") {
                            navigate("/partner")
                        }
                        else {
                            navigate("/profile")
                        }
                    }

                    }>My Profile</span>),
                    icon: <ProfileOutlined />
                },
                {
                    key: "logout",
                    label: (
                        <Link
                            to="/login"
                            onClick={() => {
                                localStorage.removeItem("token");
                            }}
                        >
                            Logout
                        </Link>
                    ),
                    icon: <LogoutOutlined />
                }
            ]
        }
    ]

    const getValidUser = async () => {
        try {
            dispatch(ShowLoading()); // loading => true 
            const response = await GetCurrentUser();
            console.log(response);
            dispatch(SetUser(response.data));
            dispatch(HideLoading());
        }
        catch (error) {
            console.log(error);
            dispatch(HideLoading()); // loading => false
            localStorage.removeItem("token");
            navigate("/login");
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getValidUser();
        }
        else {
            navigate("/login");
        }
    }, []);

    const { Header } = Layout;


    return (
        user && (
            <>
                <Layout>
                    <Header
                        style={{
                            position: "sticky",
                            top: 0,
                            zIndex: 1,
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <h3 style={{ color: "white", margin: 0 }}>
                            Book My Cinema
                        </h3>

                        <Menu theme="dark" mode="horizontal" items={navItems} style={{
                            minWidth: "250px",
                            justifyContent: "flex-end",
                            flex: "1"
                        }} />
                    </Header>


                    <div style={{ padding: 20, minHeight: 380, background: "#fff" }}>
                        {children}
                    </div>
                </Layout>
            </>
        )
    );
}

export default ProtectedRoute;
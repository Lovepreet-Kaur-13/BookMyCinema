import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { GetAllTheatresForAdmin } from '../../api/theatres'
import { useSelector, useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";

const TheatreList = () => {
    const [theatres, setTheatres] = useState([]);

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.users);

    const getData = async () => {
        try {
            dispatch(ShowLoading());

            const response = await GetAllTheatresForAdmin(user._id);

            if (response.success) {
                const allTheatres = response.data;

                setTheatres(
                    allTheatres.map((item) => ({
                        ...item,
                        key: item._id,
                    }))
                );
            } else {
                message.error(response.message);
            }

            dispatch(HideLoading());
        } catch (err) {
            dispatch(HideLoading());
            message.error(err.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Phone Number",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Status",
            key: "status",
            render: (_, data) => {
                return data.isActive ? "Approved" : "Pending / Blocked";
            },
        },
        {
            title: "Action",
            key: "action",
            render: (_, data) => {
                return (
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <Button type="primary">
                            <EditOutlined />
                        </Button>

                        <Button danger>
                            <DeleteOutlined />
                        </Button>

                        {data.isActive && (
                            <Button type="default">
                                + Shows
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                }}
            >
                <h2 style={{ margin: 0 }}>Theatres</h2>

                <Button type="primary">
                    Add Theatre
                </Button>
            </div>

            {/* Table */}
            <div
                style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
            >
                <Table
                    dataSource={theatres}
                    columns={columns}
                    pagination={{ pageSize: 5 }}
                />
            </div>
        </>
    );
};

export default TheatreList;
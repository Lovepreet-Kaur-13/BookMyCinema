import React, { useEffect, useState } from "react";
import { Table, Button, message, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { GetAllTheatresForAdmin } from "../../api/theatres";
import { useSelector, useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import TheatreForm from "./TheatreFormModal";
import DeleteTheatreModal from "./DeleteTheatreModal";
import ShowModal from "./ShowModal";

const TheatreList = () => {
    const [theatres, setTheatres] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTheatre, setSelectedTheatre] = useState(null);
    const [formType, setFormType] = useState("add");
    const [isShowModalOpen, setIsShowModalOpen] = useState(false);



    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.users);

    // GET DATA
    const getData = async () => {
        try {
            dispatch(ShowLoading());

            const response = await GetAllTheatresForAdmin(user?._id);

            if (response.success) {
                setTheatres(
                    response.data.map((item) => ({
                        ...item,
                        key: item._id,
                    }))
                );
            } else {
                message.error(response.message);
            }

        } catch (err) {
            message.error(err.message);
        } finally {
            dispatch(HideLoading());
        }
    };

    const handleEdit = (data) => {
        setFormType("edit");
        setSelectedTheatre(data);
        setIsModalOpen(true);
    };

    const handleDelete = (data) => {
        setSelectedTheatre(data);
        setIsDeleteModalOpen(true);
    };

    const handleAdd = () => {
        setFormType("add");
        setSelectedTheatre(null);
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (user?._id) {
            getData();
        }
    }, [user]);

    // TABLE COLUMNS
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Address",
            dataIndex: "address",
        },
        {
            title: "Phone Number",
            dataIndex: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Status",
            render: (_, data) =>
                data.isActive ? (
                    <Tag color="green">Approved</Tag>
                ) : (
                    <Tag color="orange">Pending / Blocked</Tag>
                ),
        },
        {
            title: "Action",
            render: (_, data) => (
                <div className="flex flex-wrap gap-2">

                    {/* EDIT */}
                    <Button
                        type="primary"
                        onClick={() => handleEdit(data)}
                    >
                        <EditOutlined />
                    </Button>

                    {/* DELETE */}
                    <Button
                        danger
                        onClick={() => handleDelete(data)}
                    >
                        <DeleteOutlined />
                    </Button>

                    {/* SHOWS */}
                    {data.isActive && (
                        <Button
                            onClick={() => {
                                setIsShowModalOpen(true);
                                setSelectedTheatre(data);
                            }}
                            type="default">+ Shows</Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <>
            {/* HEADER */}
            <div className="flex justify-between items-center gap-3 mb-4">
                <h2 className="text-xl font-semibold m-0">Theatres List</h2>

                <Button type="primary" onClick={handleAdd}>
                    Add Theatre
                </Button>
            </div>

            {/* TABLE */}
            <div className="bg-white p-4 sm:p-5 rounded-xl shadow overflow-x-auto">
                <Table
                    dataSource={theatres}
                    columns={columns}
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: "max-content" }}
                />
            </div>

            {/* ADD / EDIT MODAL */}
            {isModalOpen && (
                <TheatreForm
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    selectedTheatre={selectedTheatre}
                    setSelectedTheatre={setSelectedTheatre}
                    formType={formType}
                    getData={getData}
                />
            )}

            {/* DELETE MODAL */}
            {isDeleteModalOpen && (
                <DeleteTheatreModal
                    isDeleteModalOpen={isDeleteModalOpen}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    selectedTheatre={selectedTheatre}
                    setSelectedTheatre={setSelectedTheatre}
                    getData={getData}
                />
            )}
            {isShowModalOpen && (
                <ShowModal
                    isShowModalOpen={isShowModalOpen}
                    setIsShowModalOpen={setIsShowModalOpen}
                    selectedTheatre={selectedTheatre}
                />
            )}
        </>
    );
};

export default TheatreList;
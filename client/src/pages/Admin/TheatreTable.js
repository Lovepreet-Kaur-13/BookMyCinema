import { useState, useEffect } from "react";
import { GetAllTheatresForAdmin, UpdateTheatre } from "../../api/theatres";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { message, Button, Table } from "antd";

const TheatresTable = () => {
    const [theatres, setTheatres] = useState([]);
    const dispatch = useDispatch();

    // GET DATA
    const getData = async () => {
        try {
            dispatch(ShowLoading());

            const response = await GetAllTheatresForAdmin();

            if (response.success) {
                const allTheatres = response.data;

                setTheatres(
                    allTheatres.map((item) => ({
                        ...item,
                        key: `theatre-${item._id}`,
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

    // APPROVE / BLOCK THEATRE
    const handleStatusChange = async (theatre) => {
        try {
            dispatch(ShowLoading());

            const values = {
                theatreId: theatre._id,
                isActive: !theatre.isActive,
            };

            const response = await UpdateTheatre(values);

            if (response.success) {
                message.success(response.message);
                getData(); // refresh list
            } else {
                message.error(response.message);
            }

        } catch (err) {
            message.error(err.message);
        } finally {
            dispatch(HideLoading());
        }
    };

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
            title: "Owner",
            render: (_, data) => data.owner?.name || "N/A",
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
                data.isActive ? "Approved" : "Pending / Blocked",
        },
        {
            title: "Action",
            render: (_, data) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    {data.isActive ? (
                        <Button
                            danger
                            onClick={() => handleStatusChange(data)}
                        >
                            Block
                        </Button>
                    ) : (
                        <Button
                            type="primary"
                            onClick={() => handleStatusChange(data)}
                        >
                            Approve
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    useEffect(() => {
        getData();
    }, []);

    return (
        <div
            style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
        >
            <Table dataSource={theatres} columns={columns} />
        </div>
    );
};

export default TheatresTable;
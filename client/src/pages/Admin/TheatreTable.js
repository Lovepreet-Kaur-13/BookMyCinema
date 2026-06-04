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

  // APPROVE / BLOCK
  const handleStatusChange = async (theatre) => {
    try {
      dispatch(ShowLoading());

      const response = await UpdateTheatre({
        theatreId: theatre._id,
        isActive: !theatre.isActive,
      });

      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    } finally {
      dispatch(HideLoading());
    }
  };

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
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      render: (_, data) => (
        <span
          className={
            data.isActive ? "text-green-600 font-medium" : "text-red-500"
          }
        >
          {data.isActive ? "Approved" : "Pending / Blocked"}
        </span>
      ),
    },
    {
      title: "Action",
      render: (_, data) => (
        <div className="flex gap-2">
          {data.isActive ? (
            <Button danger onClick={() => handleStatusChange(data)}>
              Block
            </Button>
          ) : (
            <Button type="primary" onClick={() => handleStatusChange(data)}>
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
    <div className="w-full bg-white p-2 md:p-5 rounded-xl shadow">

      <Table
        dataSource={theatres}
        columns={columns}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />

    </div>
  );
};

export default TheatresTable;
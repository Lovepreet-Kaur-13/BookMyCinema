import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { GetAllMovies } from "../../api/movies";
import { useDispatch } from "react-redux";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import MovieForm from "./MovieForm";
import DeleteMovieModal from "./DeleteMovieModal";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [formType, setFormType] = useState("add");

    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(ShowLoading());

            const response = await GetAllMovies();

            if (response.success) {
                setMovies(
                    response.data.map((item) => ({
                        ...item,
                        key: item._id,
                    }))
                );
            } else {
                message.error(response.message);
            }
        } catch (error) {
            console.log(error);
            message.error("Failed to fetch movies");
        } finally {
            dispatch(HideLoading());
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleAdd = () => {
        setSelectedMovie(null);
        setFormType("add");
        setIsModalOpen(true);
    };

    const handleEdit = (data) => {
        setSelectedMovie(data);
        setFormType("edit");
        setIsModalOpen(true);
    };

    const handleDelete = (data) => {
        setSelectedMovie(data);
        setIsDeleteModalOpen(true);
    };

    const columns = [
        {
            title: "Poster",
            dataIndex: "poster",
            render: (_, data) => (
                <img
                    src={data.poster}
                    alt="movie"
                    className="w-10 h-14 md:w-16 md:h-24 rounded object-cover"
                />
            ),
        },
        {
            title: "Movie Name",
            dataIndex: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Duration",
            dataIndex: "duration",
            render: (_, data) => {
                const h = Math.floor(data.duration / 60);
                const m = data.duration % 60;
                return `${h}h ${m}m`;
            },
        },
        {
            title: "Genre",
            dataIndex: "genre",
        },
        {
            title: "Language",
            dataIndex: "language",
        },
        {
            title: "Release Date",
            dataIndex: "releaseDate",
            render: (_, data) =>
                moment(data.releaseDate).format("MM-DD-YYYY"),
        },
        {
            title: "Action",
            render: (_, data) => (
                <div className="flex gap-2">
                    <Button onClick={() => handleEdit(data)}>
                        <EditOutlined />
                    </Button>
                    <Button danger onClick={() => handleDelete(data)}>
                        <DeleteOutlined />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            {/* MAIN CONTAINER */}
            <div className="w-full bg-white rounded-xl shadow p-2 md:p-5">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">
                    <Button type="primary" onClick={handleAdd}>
                        Add Movie
                    </Button>
                </div>

                <Table
                    dataSource={movies}
                    columns={columns}
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: "max-content" }}
                />
            </div>

            {/* MODALS */}
            {isModalOpen && (
                <MovieForm
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    formType={formType}
                    getData={getData}
                />
            )}

            {isDeleteModalOpen && (
                <DeleteMovieModal
                    isDeleteModalOpen={isDeleteModalOpen}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    getData={getData}
                />
            )}
        </>
    );
};

export default MovieList;
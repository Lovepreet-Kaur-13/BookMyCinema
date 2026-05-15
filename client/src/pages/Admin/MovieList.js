import React from "react";
import { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import { ShowLoading, HideLoading } from '../../redux/loaderSlice';
import { GetAllMovies } from '../../api/movies';
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

            const allMovies = response.data;

           if(response.success){
             setMovies(
                allMovies.map((item) => ({
                    ...item,
                    key: item._id,
                }))
            );
           }
           else {
            message.error(response.message);
        }
        } catch (error) {
            console.log(error);
            message.error("Failed to fetch movies");
        } finally {
            dispatch(HideLoading());
        }
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

    const handleAdd = () => {
        setIsModalOpen(true);
        setFormType("add");


    };

    useEffect(() => {
        getData();
    }, []);

    const tableHeadings = [
        {
            title: "Poster",
            dataIndex: "poster",
            render: (text, data) => {
                return (
                    <img src={data.poster} alt="movie-poster" width="75" height="110"
                        style={{
                            borderRadius: "8px",
                            objectFit: "cover"
                        }} />
                )
            }
        },
        {
            title: "Movie Name",
            dataIndex: "title"
        },
        {
            title: "Description",
            dataIndex: "description"
        },
        {
            title: "Duration",
            dataIndex: "duration",
            render: (text, data) => {
                const hours = Math.floor(data.duration / 60);
                const minutes = data.duration % 60;
                return `${hours}h ${minutes}m`;
            },
        },
        {
            title: "Genre",
            dataIndex: "genre"
        },
        {
            title: "Language",
            dataIndex: "language"
        },
        {
            title: "ReleaseDate",
            dataIndex: "releaseDate",
            render: (text, data) => {
                return moment(data.releaseDate).format("MM-DD-YYYY");
            },

        },
        {
            title: "Action",
            render: (text, data) => {
                return (
                    <div style={{
                        display: "flex",
                        gap: "10px",
                    }}>
                        <Button type="default" onClick={() => handleEdit(data)}
                        >
                            <EditOutlined />
                        </Button>
                        <Button danger onClick={() => handleDelete(data)}
                        >
                            <DeleteOutlined />
                        </Button>
                    </div>
                );
            },
        },

    ]

    return (
        <>
            <div
                style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <h2 style={{ margin: 0 }}>Movie List</h2>
                    <Button
                        type="primary"
                        onClick={handleAdd}
                    >
                        Add Movie
                    </Button>
                </div>

                {/* TABLE */}
                <Table
                    dataSource={movies}
                    columns={tableHeadings}
                    pagination={{ pageSize: 5 }}
                />
            </div>

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
}

export default MovieList;
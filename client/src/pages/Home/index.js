import React, { useEffect, useState } from "react";
import { Row, Col, Input, message, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { GetAllMovies } from "../../api/movies";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";


const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());

      const response = await GetAllMovies();

      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    } finally {
      dispatch(HideLoading());
    }
  };


  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="inner-container">
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <h2
          style={{
            fontWeight: "600",
            color: "#333",
            marginBottom: "20px",
          }}
        >
          🎬 Find Your Favorite Movies Here
        </h2>

        <Row justify="center">
          <Col xs={24} sm={20} md={14} lg={10}>
            <Input
              placeholder="Search movies..."
              onChange={handleSearch}
              prefix={<SearchOutlined />}
              size="large"
              style={{
                borderRadius: "10px",
                height: "42px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            />
          </Col>
        </Row>
      </div>
      <Row
        className="justify-content-center"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {movies &&
          movies
            .filter((movie) =>
              movie.title.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((movie) => (
              <Col
                className="gutter-row mb-10"
                key={movie._id}
                span={{
                  xs: 24,
                  sm: 24,
                  md: 12,
                  lg: 10,
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    background: "#fff",
                    padding: "15px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    transition: "0.3s",
                  }}
                  className="movie-card"

                >
                  {/* IMAGE */}
                  <div style={{ position: "relative" }}>
                    <img
                      onClick={() => {
                        navigate(
                          `/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
                        );
                      }}
                      src={movie.poster}
                      alt="Movie Poster"
                      width={220}
                      height={300}
                      style={{
                        borderRadius: "10px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}

                    />
                  </div>

                  {/* TITLE */}
                  <h3
                    style={{
                      marginTop: "10px",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
                      );
                    }}
                  >
                    {movie.title}
                  </h3>

                  {/* BUTTON */}
                  <Button
                    type="primary"
                    style={{
                      marginTop: "8px",
                      width: "100%",
                      borderRadius: "8px",
                      fontWeight: "500",
                    }}
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
                      );
                    }}
                  >
                     🎫 Book Now
                  </Button>
                </div>
              </Col>
            ))}

      </Row>
    </div>
  );
};


export default Home;
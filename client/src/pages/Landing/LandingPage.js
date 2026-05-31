import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { GetAllMovies } from "../../api/movies";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const LandingPage = () => {
  const [movies, setMovies] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const navigate = useNavigate();

  const getMovies = async () => {
    try {
      const response = await GetAllMovies();

      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const nextMovies = () => {
    if (startIndex + 4 < movies.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevMovies = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleMovies = movies.slice(startIndex, startIndex + 4);

  return (
    <div className="landing-page">
      <div className="overlay"></div>

      <div className="content">
        <h1 className="title">Book My Cinema 🎦</h1>

        <p className="subtitle">
          Browse Movies • Select Show and Book Seats • Secure Payment
        </p>

        <p className="desc">
          Book your favorite movies in just a few clicks
        </p>

        <div className="btn-group">
          <Button type="primary" size="large" onClick={() => navigate("/login")}>
            Login
          </Button>

          <Button size="large" onClick={() => navigate("/register")}>
            Register
          </Button>
        </div>

        {/* Movies */}
        <div className="movie-section">
          <Button
            shape="circle"
            icon={<LeftOutlined />}
            onClick={prevMovies}
            disabled={startIndex === 0}
            className="nav-btn"
          />

          <div className="movie-list">
            {visibleMovies.map((movie) => (
              <div
                key={movie._id}
                className="movie-card"
                onClick={() => navigate("/login")}
              >
                <img src={movie.poster} alt={movie.title} />
                <h3 style={{color:"white"}}>{movie.title}</h3>
              </div>
            ))}
          </div>

          <Button
            shape="circle"
            icon={<RightOutlined />}
            onClick={nextMovies}
            disabled={startIndex + 4 >= movies.length}
            className="nav-btn"
          />
        </div>
      </div>

      <div className="footer">
        © 2026 Book My Cinema | Created By Lovepreet Kaur Khela
      </div>
    </div>
  );
};

export default LandingPage;
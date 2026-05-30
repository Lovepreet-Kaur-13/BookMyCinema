import React, { useEffect, useState } from "react";
import { Button, Row, Col, Card, message } from "antd";
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
    if (startIndex + 5 < movies.length) {
      setStartIndex(startIndex + 5);
    }
  };

  const prevMovies = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 5);
    }
  };

  const visibleMovies = movies.slice(startIndex, startIndex + 5);

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
    
      <div className="landingpage-main-container">
        <div>
          <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
            🎬 Book My Cinema
          </h1>

          <p style={{ fontSize: "18px", marginTop: "10px", opacity: 0.9 }}>
            Every movie you love — just one click away
          </p>

          <div style={{ marginTop: "25px" }}>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/login")}
              style={{ marginRight: "10px", height: "45px" }}
            >
              Login
            </Button>

            <Button
              size="large"
              onClick={() => navigate("/register")}
              style={{ height: "45px" }}
            >
              Register
            </Button>
          </div>
        </div>
      </div>

      {/* MOVIES SECTION */}
      <div
        style={{
          padding: "60px 40px",
          background: "#0f0f0f",
          color: "#fff",
          position: "relative",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
          🔥 Now Showing
        </h2>

        {/* LEFT ARROW */}
        <Button
          shape="circle"
          icon={<LeftOutlined />}
          onClick={prevMovies}
          disabled={startIndex === 0}
          style={{
            position: "absolute",
            left: "50px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "#1c1c1c",
            color: "#fff",
            border: "none",
            width: "45px",
            height: "45px",
          }}
        />

        {/* RIGHT ARROW */}
        <Button
          shape="circle"
          icon={<RightOutlined />}
          onClick={nextMovies}
          disabled={startIndex + 5 >= movies.length}
          style={{
            position: "absolute",
            right: "40px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "#1c1c1c",
            color: "#fff",
            border: "none",
            width: "45px",
            height: "45px",
          }}
        />

        <Row gutter={[24, 24]} justify="center">
          {visibleMovies.map((movie) => (
            <Col key={movie._id} xs={24} sm={12} md={8} lg={6} xl={4}>
              <Card
                hoverable
                onClick={() => navigate("/login")}
                style={{
                  backgroundColor: "#1c1c1c",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "none",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                className="movie-card"
                cover={
                  <img
                    alt={movie.title}
                    src={movie.poster}
                    style={{
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                }
              >
                <h3 style={{ textAlign: "center", color: "#fff" }}>
                  {movie.title}
                </h3>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* FOOTER */}
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          background: "#000",
          color: "#aaa",
        }}
      >
        © 2026 Book My Cinema | Created By Lovepreet Kaur Khela
      </div>
    </div>
  );
};

export default LandingPage;
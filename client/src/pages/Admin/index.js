import React from "react";
import { Tabs } from "antd";
import MovieList from "./MovieList";
import TheatreTable from "./TheatreTable";

const Admin = () => {

    const tabItems = [
        {
            key: "movies",
            label: "Movies",
            children: <MovieList />
        },
        {
            key: "theatres",
            label: "Theatres",
            children: <TheatreTable />
        }
    ]
    return (
        <div style={{ padding: "10px 40px",
            minHeight:"100vh",
            paddingBottom:"80px"
        }}>
            <Tabs items={tabItems} />
        </div>
    );
}

export default Admin;
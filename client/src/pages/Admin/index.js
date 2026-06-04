import React from "react";
import { Tabs } from "antd";
import MovieList from "./MovieList";
import TheatreTable from "./TheatreTable";

const Admin = () => {
  const tabItems = [
    {
      key: "movies",
      label: "Movies",
      children: <MovieList />,
    },
    {
      key: "theatres",
      label: "Theatres",
      children: <TheatreTable />,
    },
  ];

  return (
    <div className="w-full px-2 sm:px-3 md:px-6 min-h-screen pb-20">
      <Tabs items={tabItems} />
    </div>
  );
};

export default Admin;
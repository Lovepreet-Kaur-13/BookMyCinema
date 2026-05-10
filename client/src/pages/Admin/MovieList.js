import React from "react";
import { Table } from "antd";


const MovieList = () => {

    const tableHeadings = [
        {
            title:"Poster"
        },
        {
            title:"Movie Name",
            dataIndex: "name"
        },
        {
            title:"Description",
            dataIndex:"description"
        },
        {
            title:"Duration",
            dataIndex:"duration"
        },
        {
            title:"Genre",
            dataIndex:"genre"
        },
        {
            title:"Language",
            dataIndex:"language"
        },
        {
            title:"ReleaseDate",
            dataIndex:"releaseDate"
        }
    ]

    return (
        <div>
          <Table columns={tableHeadings} />
        </div>
    )
}

export default MovieList;
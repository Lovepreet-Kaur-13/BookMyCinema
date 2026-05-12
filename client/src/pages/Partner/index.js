import React from "react";
import TheatreList from "./TheatreList";
import { Tabs } from "antd";

const Partner = () =>{
     const items = [
        {
            key: "1",
            label: "Partner Dashboard",
            children: <TheatreList />,
        },
    ];
    return (
        <>
            <Tabs style={{ padding: "0 20px" }}
            items={items} />
        </>
    );
}

export default Partner;
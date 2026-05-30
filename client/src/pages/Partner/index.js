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
            <Tabs style={{ padding: "10px 40px",
                minHeight:"100vh",
                paddingBottom:"80px"
            }}
            items={items} />
        </>
    );
}

export default Partner;
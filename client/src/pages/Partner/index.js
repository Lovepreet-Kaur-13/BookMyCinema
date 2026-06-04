import React from "react";
import TheatreList from "./TheatreList";
import { Tabs } from "antd";

const Partner = () => {
    const items = [
        {
            key: "1",
            label: "Partner Dashboard",
            children: <TheatreList />,
        },
    ];
    return (
        <>
            <div className="w-full px-2 sm:px-3 md:px-6 min-h-screen pb-20">
                <Tabs items={items} />
            </div>
        </>
    );
}

export default Partner;
import React from "react";

function DetailPill({ content }) {
    const obj = {
        1: ["Beginner", "primary"],
        2: ["Intermediate", "success"],
        3: ["Advanced", "danger"],
        DJ: ["DJ", "info"],
        Production: ["Production", "warning"],
    };
    return (
        <span>
            {/* <div className={"badge rounded-pill text-bg-" + obj[content][1]}> */}
            {obj[content][0]}
        </span>
    );
}

export default DetailPill;

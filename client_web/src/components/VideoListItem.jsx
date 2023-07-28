import React from "react";
import DetailPill from "./DetailPill";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function VideoListItem({ video, setVideoURI, activeId, setActiveId }) {
    const completed = useSelector((state) => state.users?.completed?.videos);
    const handleVideoChange = () => {
        setVideoURI(video.videoURI);
        setActiveId(video._id);
    };

    return (
        <button
            type="button"
            onClick={handleVideoChange}
            className={`list-group-item list-group-item-action ${
                activeId === video._id ? "active" : ""
            }`}
        >
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{video.title}</h5>
                {/* <small>3 days ago</small> */}
            </div>
            <DetailPill content={video.difficulty} />
            <small className="ms-2">Views: {video.views}</small>
            {completed?.includes(video._id) && (
                <FontAwesomeIcon
                    icon={faCircleCheck}
                    style={{ marginLeft: "1rem", color: "green" }}
                />
            )}
        </button>
    );
}

export default VideoListItem;
// aria-current="true"

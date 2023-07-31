import React from "react";
import DetailPill from "./DetailPill";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faEye,
    faClock,
} from "@fortawesome/free-solid-svg-icons";

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
            </div>
            <div className="row">
                {/* <div className="col-4">
                    <DetailPill content={video.difficulty} />
                </div> */}
                <div className="col-4">
                    <small className="ms-2">
                        <FontAwesomeIcon
                            icon={faEye}
                            style={{ marginRight: "2px" }}
                        />{" "}
                        {video.views}
                    </small>
                </div>
                <div className="col-4">
                    <small className="ms-2">
                        <FontAwesomeIcon
                            icon={faClock}
                            style={{ marginRight: "2px" }}
                        />{" "}
                        {video?.timeLength}
                    </small>
                </div>

                {/* {video.timeLength > 0 && (
                    <div className="col-4">
                        <small className="ms-2">
                            <FontAwesomeIcon
                                icon={faClock}
                                style={{ marginRight: "2px" }}
                            />{" "}
                            {video?.timeLength}
                        </small>
                    </div>
                )} */}
                <div className="col-4">
                    {completed?.includes(video._id) && (
                        <FontAwesomeIcon
                            icon={faCircleCheck}
                            title="Completed"
                            style={{ marginLeft: "1rem", color: "green" }}
                        />
                    )}
                </div>
            </div>
        </button>
    );
}

export default VideoListItem;
// aria-current="true"

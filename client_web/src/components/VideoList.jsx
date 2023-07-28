import React from "react";
import { useSelector } from "react-redux";
import VideoListItem from "./VideoListItem";

function VideoList({ setVideoURI, activeId, setActiveId }) {
    const course = useSelector((state) => state.courses.item);
    return (
        <div className="video-list-fixed">
            <div className="video-list-container">
                <h2 className="p-3 mb-0">Course content</h2>
                <div className="list-group list-group-flush video-list-items">
                    {course?.videos?.length > 0 ? (
                        course?.videos?.map((video) => (
                            <VideoListItem
                                key={video._id}
                                video={video}
                                setVideoURI={setVideoURI}
                                activeId={activeId}
                                setActiveId={setActiveId}
                            />
                        ))
                    ) : (
                        <div className="list-group-item">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">No videos</h5>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoList;

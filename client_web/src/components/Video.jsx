import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import DetailPill from "./DetailPill";
import { videoActions } from "../redux/actions/video.actions";
import { useAuth } from "../hooks/useAuth";
import empty from "../assets/images/empty-folder.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserGraduate,
    faUsers,
    faUserGroup,
    faVideo,
} from "@fortawesome/free-solid-svg-icons";

function Video({ videoURI, activeId }) {
    const course = useSelector((state) => state.courses.item);
    const { id: userId } = useAuth();
    const dispatch = useDispatch();
    const fetchedViewRef = useRef(false);
    const fetchedCompleteRef = useRef(false);

    const handleDuration = (time) => {
        const video = course?.videos?.find((video) => video._id === activeId);
        if (video?.timeLength < 0)
            dispatch(
                videoActions.setVideoLength(activeId, time, video?.courseId)
            );
    };

    const handleProgress = (time) => {
        handleViews(time);
        handleComplete(time);
    };

    const handleViews = (time) => {
        // dispatch viewed action at 20s or .80 played if still hasnt been 20s
        if (time.playedSeconds < 5) fetchedViewRef.current = false;
        if (fetchedViewRef.current) return;
        if (
            time.playedSeconds >= 20 ||
            (time.playedSeconds < 20 && time.played > 0.8)
        ) {
            dispatch(videoActions.viewVideo(activeId));
            fetchedViewRef.current = true;
        }
    };

    const handleComplete = (time) => {
        // dispatch completed action once at .80 played
        if (fetchedCompleteRef.current) return;
        if (time.played > 0.8) {
            dispatch(videoActions.completeVideo(activeId, userId));
            fetchedCompleteRef.current = true;
        }
    };

    return (
        <div className="mb-5" style={{ marginRight: "350px" }}>
            {videoURI ? (
                <ReactPlayer
                    config={{
                        file: { attributes: { controlsList: "nodownload" } },
                    }}
                    // Disable right click
                    onContextMenu={(e) => e.preventDefault()}
                    url={videoURI}
                    width={"100%"}
                    height={"100%"}
                    controls
                    playing
                    // onDuration={handleDuration}
                    onProgress={handleProgress}
                />
            ) : (
                <div className="hero px-4 mb-4 text-center">
                    <img src={empty} alt="" />
                    <h5>There doesn't seem to be any videos in this course</h5>
                </div>
            )}
            <div className="container-fluid">
                <div className="m-3">
                    <div className="row">
                        <div className="col-xl-5">
                            <h2>{course.title}</h2>
                            <DetailPill content={course.category} />
                            <span className="me-3"></span>
                            <DetailPill content={course.difficulty} />
                            <div className="row align-items-center">
                                <div className="col-2">
                                    <h6 className="mt-2">
                                        <FontAwesomeIcon
                                            icon={faUserGraduate}
                                            style={{ marginRight: "2px" }}
                                        />{" "}
                                        {course.totalStudents}
                                    </h6>
                                </div>
                                <div className="col-2">
                                    <h6 className="mt-2">
                                        <FontAwesomeIcon
                                            icon={faVideo}
                                            style={{ marginRight: "2px" }}
                                        />{" "}
                                        {course.videos.length}
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <p style={{ whiteSpace: "pre-wrap" }}>
                                {course.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Video;
// "https://res.cloudinary.com/aotearoadjs/video/upload/v1647403832/aotearoadj/190301_1_25_11_gv4jca.mp4"

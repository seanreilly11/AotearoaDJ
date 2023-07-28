import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { courseActions } from "../../redux/actions/course.actions";
import Video from "../../components/Video";
import VideoList from "../../components/VideoList";

function Course() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const course = useSelector((state) => state.courses.item);
    const [videoURI, setVideoURI] = useState("");
    const [activeId, setActiveId] = useState("");
    let fetchedRef = useRef(false);

    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        dispatch(courseActions.getSingle(id));
    }, []);

    useEffect(() => {
        if (course != null) {
            setVideoURI(course?.videos[0]?.videoURI);
            setActiveId(course?.videos[0]?._id);
        }
    }, [course]);

    return course ? (
        <>
            <Video videoURI={videoURI} activeId={activeId} />
            <VideoList
                setVideoURI={setVideoURI}
                activeId={activeId}
                setActiveId={setActiveId}
            />
        </>
    ) : (
        <h4>Loading...</h4>
    );
}

export default Course;

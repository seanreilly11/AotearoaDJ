import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseActions } from "../redux/actions/course.actions";
import CourseCard from "./CourseCard";

function CourseList() {
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.courses.items);
    const fetchedRef = useRef(false);

    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        dispatch(courseActions.getAll());
    }, []);

    return (
        <div className="container-fluid">
            <div className="mx-3">
                {/* <hr /> */}
                <h2>DJ</h2>
                <div className="row gy-4 mb-5">
                    {courses
                        ?.filter((course) => course.category === "DJ")
                        .map((course) => (
                            <CourseCard key={course._id} course={course} />
                        ))}
                </div>
                {/* <hr /> */}
                <h2>Production</h2>
                <div className="row gy-4">
                    {courses
                        ?.filter((course) => course.category === "Production")
                        .map((course) => (
                            <CourseCard key={course._id} course={course} />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default CourseList;

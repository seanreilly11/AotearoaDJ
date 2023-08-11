import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseActions } from "../redux/actions/course.actions";
import CourseCard from "./CourseCard";
import Spinner from "./Spinner";

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
                <h2>DJ</h2>
                <hr />
                <div className="row gy-4 mb-5">
                    {courses ? (
                        courses
                            ?.filter((course) => course.category === "DJ")
                            .map((course) => (
                                <CourseCard key={course._id} course={course} />
                            ))
                    ) : (
                        <Spinner />
                    )}
                </div>

                <h2>Production</h2>
                <hr />
                <div className="row gy-4">
                    {courses ? (
                        courses
                            ?.filter(
                                (course) => course.category === "Production"
                            )
                            .map((course) => (
                                <CourseCard key={course._id} course={course} />
                            ))
                    ) : (
                        <Spinner />
                    )}
                </div>
            </div>
        </div>
    );
}

export default CourseList;

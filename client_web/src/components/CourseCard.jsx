import React from "react";
import DetailPill from "./DetailPill";
import { NavLink } from "react-router-dom";

function CourseCard({ course }) {
    return (
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
            <NavLink
                to={"/course/" + course._id}
                className={"text-decoration-none"}
            >
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">{course.title}</h4>
                        <DetailPill content={course.difficulty} />
                        <h6 className="mt-2">
                            Students: {course.totalStudents}
                        </h6>
                    </div>
                </div>
            </NavLink>
        </div>
    );
}

export default CourseCard;

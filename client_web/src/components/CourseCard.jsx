import React from "react";
import DetailPill from "./DetailPill";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserGraduate,
    faUsers,
    faUserGroup,
    faVideo,
} from "@fortawesome/free-solid-svg-icons";

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
                        <div className="row align-items-center">
                            {/* <div className="col-4">
                                <DetailPill content={course.difficulty} />
                            </div> */}
                            <div className="col-4">
                                <h6 className="mt-2">
                                    <FontAwesomeIcon
                                        icon={faUserGraduate}
                                        style={{ marginRight: "2px" }}
                                    />{" "}
                                    {course.totalStudents}
                                </h6>
                            </div>
                            <div className="col-4">
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
                </div>
            </NavLink>
        </div>
    );
}

export default CourseCard;

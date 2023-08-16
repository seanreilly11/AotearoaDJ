import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/images/aotearoa_dj_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/useAuth";

function Sidebar() {
    const user = useAuth();
    const username = useSelector((state) => state.authentication.name);
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <div
            className="d-flex flex-column flex-shrink-0 position-fixed p-3 text-bg-dark sidebar"
            style={{ width: "280px", height: "100%" }}
        >
            <NavLink
                to="/"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
                <img src={logo} alt="" />
                {/* <h1 className="fs-4">Aotearoa DJ Academy</h1> */}
            </NavLink>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink
                        to="/home"
                        className="nav-link"
                        aria-current="page"
                    >
                        Home
                    </NavLink>
                </li>
                {/* <li className="nav-item">
                    <NavLink to="/course/1" className="nav-link">
                        Course
                    </NavLink>
                </li> */}
                <li className="nav-item">
                    <NavLink to="/" className="nav-link">
                        Log out
                    </NavLink>
                </li>
            </ul>
            <hr />
            <div>
                {showUserMenu && (
                    <ul className="nav nav-pills flex-column text-small mb-3">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link text-white"
                                to="/settings"
                            >
                                Settings
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="nav-link text-white"
                                to="/profile"
                            >
                                Profile
                            </NavLink>
                        </li>
                    </ul>
                )}
                <div
                    className="d-flex align-items-center justify-content-between text-white text-decoration-none"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                >
                    {/* <img
                        src="https://github.com/mdo.png"
                        alt=""
                        width="32"
                        height="32"
                        className="rounded-circle me-2"
                    /> */}
                    <strong>{user?.firstname || "User"}</strong>
                    <FontAwesomeIcon
                        icon={faChevronUp}
                        className={
                            "usermenu-arrow " + (showUserMenu ? "rotate" : "")
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;

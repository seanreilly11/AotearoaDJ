import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/aotearoa_dj_logo_icon_nobg.png";

function HomeCover() {
    return (
        <div className="home-cover">
            <div className="container">
                <header className="py-2">
                    <nav className="navbar">
                        <span className="navbar-brand text-white">
                            <img
                                src={logo}
                                alt="Aotearoa DJ Academy"
                                style={{ width: "3rem", marginRight: "1rem" }}
                            />
                            Aotearoa DJ Academy
                        </span>
                        <NavLink
                            to={"/login"}
                            className={"btn btn-outline-primary"}
                        >
                            Login
                        </NavLink>
                    </nav>
                </header>
                <div className="home-cover--text">
                    <div className="row my-5">
                        <div className="col-lg-6 col-md-8 col-sm-12">
                            <h1 className="display-3 mb-4">
                                Learn to DJ, <br />
                                Step by step
                            </h1>
                            <NavLink
                                to={"/login"}
                                className={"btn btn-primary"}
                            >
                                Get started!
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeCover;

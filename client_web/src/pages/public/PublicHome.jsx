import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { authenticationActions } from "../../redux/actions/authentication.actions";

function PublicHome() {
    const auth = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        auth && dispatch(authenticationActions.signOut());
    }, []);

    return (
        <div className="d-flex h-100">
            <div className="container">
                <header>
                    <nav className="navbar">
                        <div className="container">
                            <span className="navbar-brand">
                                Aotearoa DJ Academy
                            </span>
                        </div>
                    </nav>
                </header>
                <div className="d-flex align-items-center my-5 py-5">
                    <div className="container mt-auto">
                        <div className="row">
                            <div className="col-lg-6 col-md-8 col-sm-12">
                                <NavLink
                                    to={"/login"}
                                    className={"btn btn-primary"}
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to={"/login"}
                                    className={"btn btn-link"}
                                >
                                    Register
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PublicHome;

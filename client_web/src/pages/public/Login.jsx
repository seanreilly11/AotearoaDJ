import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authenticationActions } from "../../redux/actions/authentication.actions";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/images/aotearoa_dj_logo_icon_nobg.png";

function Login() {
    const dispatch = useDispatch();
    const auth = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = ({ email, password }) =>
        dispatch(authenticationActions.signIn(email, password));

    useEffect(() => {
        auth && navigate("/home");
    }, [auth]);

    return (
        <div className="login-cover p-3">
            <div className="container">
                <header className="py-2">
                    <nav className="navbar">
                        <NavLink to={"/"} className="navbar-brand">
                            <img
                                src={logo}
                                alt="Aotearoa DJ Academy"
                                style={{ width: "3rem", marginRight: "1rem" }}
                            />
                            Aotearoa DJ Academy
                        </NavLink>
                    </nav>
                </header>
                <form
                    className="mt-5"
                    style={{ width: "400px" }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            className="form-control"
                            type="email"
                            {...register("email", { required: true })}
                        />
                        {errors.email && <span>This field is required</span>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            {...register("password", { required: true })}
                        />
                        {errors.password && <span>This field is required</span>}
                    </div>
                    <div className="mt-3">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;

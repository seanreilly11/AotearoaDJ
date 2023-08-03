import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { authenticationActions } from "../../redux/actions/authentication.actions";
import logo from "../../assets/images/aotearoa_dj_logo_icon_nobg.png";
import { NavLink } from "react-router-dom";
import Spinner from "../../components/Spinner";

function Register() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authentication.loading);
    const error = useSelector((state) => state.authentication.error);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (passport) =>
        dispatch(authenticationActions.register(passport));

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
                        <label htmlFor="firstname" className="form-label">
                            First Name
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            {...register("firstname", { required: true })}
                        />
                        {errors.firstname && (
                            <span className="invalid-feedback">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="lastname" className="form-label">
                            Last Name
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            {...register("lastname", { required: true })}
                        />
                        {errors.lastname && (
                            <span className="invalid-feedback">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            className={
                                "form-control" +
                                (error.status === 409 ? " is-invalid" : "")
                            }
                            type="email"
                            {...register("email", { required: true })}
                        />
                        {error.status === 409 && (
                            <span className="invalid-feedback">
                                {error.message}
                            </span>
                        )}
                        {errors.email && (
                            <span className="invalid-feedback">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            {...register("password", { required: true })}
                        />
                        {errors.password && (
                            <span className="invalid-feedback">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mt-3">
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                        <NavLink to="/login" className={"btn btn-link"}>
                            Already have an account?
                        </NavLink>
                        {loading && <Spinner />}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;

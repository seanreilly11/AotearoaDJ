import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { authenticationActions } from "../../redux/actions/authentication.actions";
import { useNavigate } from "react-router-dom";

function Login() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.authentication.id);
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
        <div className="p-3">
            <h2>Login</h2>
            <form
                className=""
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
                </div>
                <div className="mb-2">
                    <label htmlFor="password">Password</label>
                    <input
                        className="form-control"
                        type="password"
                        {...register("password", { required: true })}
                    />
                </div>
                {errors.email && <span>This field is required</span>}

                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { authenticationActions } from "../../redux/actions/authentication.actions";

function VerifyEmail() {
    const [params, setParams] = useSearchParams();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authentication.loading);
    //const error = useSelector((state) => state.authentication.error);
    const fetchedRef = useRef(false);

    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        dispatch(authenticationActions.verifyEmail(params?.get("token")));
    }, [params]);

    return (
        <div className="container">
            <h2>Verifying email</h2>
            {loading && <Spinner />}
        </div>
    );
}

export default VerifyEmail;

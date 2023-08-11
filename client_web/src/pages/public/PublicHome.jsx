import React, { useEffect, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { authenticationActions } from "../../redux/actions/authentication.actions";
import HomeCover from "../../components/PublicHome/HomeCover";
import HomeCopy from "../../components/PublicHome/HomeCopy";
import Footer from "../../components/Footer";

function PublicHome() {
    const auth = useAuth();
    const dispatch = useDispatch();
    const signedOutRef = useRef(false);

    useEffect(() => {
        if (signedOutRef.current) return;
        signedOutRef.current = true;
        auth && dispatch(authenticationActions.signOut(auth.id));
    }, [auth]);

    return (
        <>
            <HomeCover />
            <HomeCopy />
            <Footer />
        </>
    );
}

export default PublicHome;

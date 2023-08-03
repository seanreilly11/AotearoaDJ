import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { authenticationActions } from "../../redux/actions/authentication.actions";
import HomeCover from "../../components/PublicHome/HomeCover";
import HomeCopy from "../../components/PublicHome/HomeCopy";
import Footer from "../../components/Footer";

function PublicHome() {
    const auth = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        auth && dispatch(authenticationActions.signOut(auth.id));
    }, []);

    return (
        <>
            <HomeCover />
            <HomeCopy />
            <Footer />
        </>
    );
}

export default PublicHome;

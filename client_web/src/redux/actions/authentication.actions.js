import { authenticationConstants } from "../constants/authentication.constants";
import { authenticationService } from "../services/authentication.services";
import { userActions } from "./user.actions";

export const authenticationActions = {
    signIn,
    signOut,
    restoreToken,
    register,
};

function signIn(username, password) {
    return (dispatch) => {
        dispatch(request());

        authenticationService.signIn(username, password).then(
            (data) => {
                dispatch(success(data));
                localStorage.setItem("user", JSON.stringify(data));
                dispatch(userActions.getCompletedItems(data.id));
            },
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: authenticationConstants.SIGN_IN_REQUEST };
    }
    function success(data) {
        return { type: authenticationConstants.SIGN_IN_SUCCESS, data };
    }
    function failure(error) {
        return { type: authenticationConstants.SIGN_IN_FAILURE, error };
    }
}

function signOut() {
    return (dispatch) => {
        dispatch(request());

        authenticationService.signOut().then(
            (data) => dispatch(success(data)),
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: authenticationConstants.SIGN_OUT_REQUEST };
    }
    function success(data) {
        return { type: authenticationConstants.SIGN_OUT_SUCCESS, data };
    }
    function failure(error) {
        return { type: authenticationConstants.SIGN_OUT_FAILURE, error };
    }
}

function restoreToken() {
    return (dispatch) => {
        dispatch(request());

        authenticationService.restoreToken().then(
            (data) => {
                dispatch(success(data));
                dispatch(userActions.getCompletedItems(data.uid));
            },
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: authenticationConstants.RESTORE_TOKEN_REQUEST };
    }
    function success(data) {
        return { type: authenticationConstants.RESTORE_TOKEN_SUCCESS, data };
    }
    function failure(error) {
        return { type: authenticationConstants.RESTORE_TOKEN_FAILURE, error };
    }
}

function register(passport) {
    return (dispatch) => {
        dispatch(request());

        authenticationService.register(passport).then(
            (data) => {
                dispatch(success(data));
                dispatch(
                    authenticationActions.signIn(
                        passport.email,
                        passport.password
                    )
                );
            },
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: authenticationConstants.REGISTER_REQUEST };
    }
    function success(data) {
        return { type: authenticationConstants.REGISTER_SUCCESS, data };
    }
    function failure(error) {
        return { type: authenticationConstants.REGISTER_FAILURE, error };
    }
}

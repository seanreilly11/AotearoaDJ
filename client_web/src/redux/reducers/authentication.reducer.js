import { authenticationConstants } from "../constants/authentication.constants";

const initialState = {
    token: null,
    id: null,
    error: null,
    isLoading: false,
    loggingIn: false,
};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case authenticationConstants.SIGN_IN_REQUEST:
            return {
                ...state,
                loggingIn: true,
            };
        case authenticationConstants.SIGN_IN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                id: action.data.id,
                token: action.data.token,
            };
        case authenticationConstants.SIGN_IN_FAILURE:
            return {
                error: action.error,
                token: null,
                id: null,
                isLoading: false,
                loggingIn: false,
            };

        case authenticationConstants.SIGN_OUT_REQUEST:
            return {
                ...state,
            };
        case authenticationConstants.SIGN_OUT_SUCCESS:
            return {
                ...state,
                id: null,
                token: null,
            };
        case authenticationConstants.SIGN_OUT_FAILURE:
            return {
                error: action.error,
                token: null,
                id: null,
                isLoading: false,
                loggingIn: false,
            };

        case authenticationConstants.RESTORE_TOKEN_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case authenticationConstants.RESTORE_TOKEN_SUCCESS:
            return {
                ...state,
                id: action.data.id,
                token: action.data.token,
                isLoading: false,
            };
        case authenticationConstants.RESTORE_TOKEN_FAILURE:
            return {
                error: action.error,
                token: null,
                id: null,
                isLoading: false,
                loggingIn: false,
            };

        case authenticationConstants.REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case authenticationConstants.REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };
        case authenticationConstants.REGISTER_FAILURE:
            return {
                error: action.error,
                token: null,
                id: null,
                isLoading: false,
                loggingIn: false,
            };
        default:
            return state;
    }
}

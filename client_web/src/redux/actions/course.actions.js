import { courseConstants } from "../constants/course.constants";
import { courseService } from "../services/course.services";
// import { createBrowserHistory } from "history";
// const history = createBrowserHistory();

export const courseActions = {
    getAll,
    getSingle,
};

function getAll() {
    return (dispatch) => {
        dispatch(request());

        courseService.getAll().then(
            (data) => dispatch(success(data)),
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: courseConstants.GETALL_REQUEST };
    }
    function success(data) {
        return { type: courseConstants.GETALL_SUCCESS, data };
    }
    function failure(error) {
        return { type: courseConstants.GETALL_FAILURE, error };
    }
}

function getSingle(id) {
    return (dispatch) => {
        dispatch(request());

        courseService.getSingle(id).then(
            (data) => dispatch(success(data)),
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: courseConstants.GETSINGLE_REQUEST };
    }
    function success(data) {
        return { type: courseConstants.GETSINGLE_SUCCESS, data };
    }
    function failure(error) {
        return { type: courseConstants.GETSINGLE_FAILURE, error };
    }
}

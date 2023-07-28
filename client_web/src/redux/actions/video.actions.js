import { videoConstants } from "../constants/video.constants";
import { videoService } from "../services/video.services";
import { courseActions } from "./course.actions";
import { userActions } from "./user.actions";

export const videoActions = {
    getAll,
    getSingle,
    viewVideo,
    completeVideo,
    setVideoLength,
};

function getAll() {
    return (dispatch) => {
        dispatch(request());

        videoService.getAll().then(
            (data) => dispatch(success(data)),
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: videoConstants.GETALL_REQUEST };
    }
    function success(data) {
        return { type: videoConstants.GETALL_SUCCESS, data };
    }
    function failure(error) {
        return { type: videoConstants.GETALL_FAILURE, error };
    }
}

function getSingle(id) {
    return (dispatch) => {
        dispatch(request());

        videoService.getSingle(id).then(
            (data) => dispatch(success(data)),
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: videoConstants.GETSINGLE_REQUEST };
    }
    function success(data) {
        return { type: videoConstants.GETSINGLE_SUCCESS, data };
    }
    function failure(error) {
        return { type: videoConstants.GETSINGLE_FAILURE, error };
    }
}

function viewVideo(id) {
    return (dispatch) => {
        dispatch(request());

        videoService.viewVideo(id).then(
            (data) => dispatch(success(data)),
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: videoConstants.VIEWVIDEO_REQUEST };
    }
    function success(data) {
        return { type: videoConstants.VIEWVIDEO_SUCCESS, data };
    }
    function failure(error) {
        return { type: videoConstants.VIEWVIDEO_FAILURE, error };
    }
}

function completeVideo(videoId, userId) {
    return (dispatch) => {
        dispatch(request());

        videoService.completeVideo(videoId, userId).then(
            (data) => {
                dispatch(success(data));
                dispatch(userActions.getCompletedItems(userId));
            },
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: videoConstants.COMPLETEVIDEO_REQUEST };
    }
    function success(data) {
        return { type: videoConstants.COMPLETEVIDEO_SUCCESS, data };
    }
    function failure(error) {
        return { type: videoConstants.COMPLETEVIDEO_FAILURE, error };
    }
}

function setVideoLength(videoId, timeLength, courseId) {
    return (dispatch) => {
        dispatch(request());

        videoService.setVideoLength(videoId, timeLength).then(
            (data) => {
                dispatch(success(data));
                // dispatch(courseActions.getSingle(courseId));
            },
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: videoConstants.SETVIDEOLENGTH_REQUEST };
    }
    function success(data) {
        return { type: videoConstants.SETVIDEOLENGTH_SUCCESS, data };
    }
    function failure(error) {
        return { type: videoConstants.SETVIDEOLENGTH_FAILURE, error };
    }
}

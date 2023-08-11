import { config } from "../../config"; // config file for base url
import { authHeader } from "../authHeader"; // any repeating header for ajax

export const videoService = {
    getAll,
    getSingle,
    viewVideo,
    completeVideo,
    setVideoLength,
};

function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
            }

            const error = {
                message: data?.error || response.statusText,
                status: response.status,
            };
            return Promise.reject(error);
        }
        return data;
    });
}

async function getAll() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.env}/videos`, requestOptions).then(handleResponse);
}

async function getSingle(id) {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.env}/videos/${id}`, requestOptions).then(
        handleResponse
    );
}

async function viewVideo(id) {
    const requestOptions = {
        method: "PATCH",
        headers: authHeader(),
    };

    return fetch(`${config.env}/videos/view/${id}`, requestOptions).then(
        handleResponse
    );
}

async function completeVideo(videoId, userId) {
    const requestOptions = {
        method: "PATCH",
        headers: authHeader(),
    };

    return fetch(
        `${config.env}/videos/complete?videoId=${videoId}&userId=${userId}`,
        requestOptions
    ).then(handleResponse);
}

async function setVideoLength(videoId, timeLength) {
    const requestOptions = {
        method: "PATCH",
        headers: authHeader(),
    };

    return fetch(
        `${config.env}/videos/timelength?videoId=${videoId}&timeLength=${timeLength}`,
        requestOptions
    ).then(handleResponse);
}

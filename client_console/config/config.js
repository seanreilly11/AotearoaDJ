var config = {
    oldEnv: "http://api.nowsnapp.com/xcallapk1",
    env: "http://localhost:5000/api/v1",
};

const { token } = JSON.parse(localStorage.getItem("passport"));

const authHeader = {
    Accept: "*/*",
    "Content-Type": "application/json",
    authorization: "Bearer " + token,
};

// -- ENVIRONMENT OPTIONS --
// develop
// xcallapk1
// test
//https://aotearoa-dj-api.herokuapp.com/api/v1

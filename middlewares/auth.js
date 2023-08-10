const jwt = require("jsonwebtoken");

const { JWT_TOKEN } = require("../config/keys");

const verifyToken = (req, res, next) => {
    const url = req.url;
    const notRequired = ["/api/v1/users/login"];
    if (notRequired.includes(url)) return next();

    const token = req.headers["authorization"].split(" ")[1];

    if (!token)
        return res.status(403).send("A token is required for authentication");

    try {
        const decoded = jwt.verify(token, JWT_TOKEN);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;

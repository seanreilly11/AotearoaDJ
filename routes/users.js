const express = require("express");
const router = express.Router();
const {
    getUsers,
    getUserByID,
    registerUser,
    makeUserAdmin,
    updateUser,
    verifyEmail,
    loginUser,
    logoutUser,
    loginAdminUser,
    getUsersCompletedItems,
} = require("../controllers/users");

router.route("/").get(getUsers).post(registerUser);

router.route("/email").patch(verifyEmail);

router.route("/login").post(loginUser);

router.route("/logout").patch(logoutUser);

router.route("/adminlogin").post(loginAdminUser);

router.route("/adminrights").patch(makeUserAdmin);

router.route("/completed/:id").get(getUsersCompletedItems);

router.route("/:id").get(getUserByID).patch(updateUser);

module.exports = router;

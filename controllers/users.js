const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../config/keys");
const auth = require("../middlewares/auth");

// @desc Get all users
// @route GET /api/v1/users
exports.getUsers = async (req, res) => {
    try {
        console.log(req.user);
        const users = await User.find().sort({ lastLogin: -1 });
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ error: error.message });
    }
};

// @desc Get user by ID
// @route GET /api/v1/users/:id
exports.getUserByID = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "No user found" });

        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// @desc login user
// @route POST /api/v1/users/login
exports.loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ error: "Email is not valid" });

        if (bcryptjs.compareSync(req.body.password, user.password)) {
            const updateUser = await User.updateOne(
                {
                    _id: user._id,
                },
                {
                    $currentDate: {
                        updatedDate: true,
                        lastLogin: true,
                    },
                    $set: { token: generateToken(user) },
                }
            );
            const userWithToken = await User.findById(user._id);
            return res.status(200).json({
                id: userWithToken._id,
                firstname: userWithToken.firstname,
                token: userWithToken.token,
            });
            // return res.status(200).json({ ...userWithToken._doc, password: undefined });
        } else {
            return res.status(401).json({
                error: "Incorrect password",
            });
        }
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
};

// @desc logout user
// @route POST /api/v1/users/logout
exports.logoutUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        if (!user) return res.status(404).json({ error: "User not found" });

        const updateUser = await User.updateOne(
            {
                _id: user._id,
            },
            {
                $currentDate: {
                    updatedDate: true,
                },
                $set: { token: "" },
            }
        );
        return res.status(200).end();
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
};

// @desc login user on console
// @route POST /api/v1/users/adminlogin
exports.loginAdminUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ error: "User not found" });

        if (bcryptjs.compareSync(req.body.password, user.password)) {
            if (!user.admin)
                return res
                    .status(403)
                    .json({ error: "Unauthorised. Not admin" });

            const token = generateToken(user);
            const updateUser = await User.updateOne(
                {
                    _id: user._id,
                },
                {
                    $currentDate: {
                        updatedDate: true,
                    },
                    $set: { token },
                }
            );
            return res.status(200).json({
                id: user._id,
                token: token,
                firstname: user.firstname,
            });
        } else
            return res.status(401).json({
                error: "Incorrect password",
            });
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
};

// @desc Send email
// @route
exports.sendEmail = async (req, res, next) => {
    try {
        var transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "seanreilly52@gmail.com",
                pass: "xgywkihemptapjyj",
            },
        });

        // Define the email
        var mailOptions = {
            from: "Aotearoa DJ Academy",
            to: "seanreilly123@hotmail.com", // TODO: add result email
            subject: "Welcome to Aotearoa DJ Academy",
            html: defineEmailHTML(req.result),
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.send(500, err.message);
            } else {
                res.status(200).json(true);
            }
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// @desc Verify user email
// @route PATCH api/v1/users/email?token=:token
exports.verifyEmail = async (req, res, next) => {
    try {
        const { user_id, email } = jwt.verify(req.query.token, JWT_TOKEN);

        const user = await User.findOne({ _id: user_id });
        if (!user) return res.status(404).json({ error: "User not found" });
        if (user.email !== email)
            return res.status(404).json({ error: "Email doesn't match email" });
        const updateUser = await User.updateOne(
            {
                _id: user_id,
            },
            {
                $currentDate: {
                    updatedDate: true,
                },
                $set: { verified: true },
            }
        );
        return res.status(200).json(true);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

function defineEmailHTML(data) {
    let html = `<div style="display: flex; justify-content: center">
        <div
            style="
                width: 50%;
                min-width: 500px;
                background: #ccc;
                text-align: center;
                padding: 2rem;
            "
        >
            <h1 style="margin-top: 0">Welcome to Aotearoa DJ Academy!</h1>
            <h3>Hi ${data.firstname},</h3>
            <p>Thanks for joining the Dojo.</p>
            <p>
                You're almost ready to start learning the ins and outs of
                DJing and producing and start your journey to the big stage.
            </p>
            <p>
                Please click on the button below to verify your email
                address and get exclusive access to Dojo content.
            </p>
            <br />
            <a
                href="http://localhost:3000/emailverification?token=${generateToken(
                    data
                )}"
                style="
                    background-color: #c120ca;
                    color: #fff;
                    text-decoration: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                "
                >Verify your email</a
            >
            <br />
            <br />
            <p>
                Thanks, <br />
                Aotearoa DJ Academy
            </p>
        </div>
    </div>`;
    return html;
}

// @desc Add new user
// @route POST /api/v1/users
exports.registerUser = async (req, res, next) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        // this.sendEmail({ firstname });
        User.findOne({ email }, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result)
                return res
                    .status(409)
                    .json({ error: "Email is already in use" });

            const hash = bcryptjs.hashSync(password);
            const user = new User({
                firstname,
                lastname,
                email,
                password: hash,
            });
            user.save()
                .then((result) => {
                    this.sendEmail({ result });
                    return res.status(201).json(result);
                })
                .catch((err) => {
                    return res.status(500).json({
                        error: err.message,
                    });
                });
        });
    } catch (err) {
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(
                (val) => val.message
            );
            return res.status(400).json({
                error: messages,
            });
        } else {
            return res.status(500).json({
                error: "Server error",
            });
        }
    }
};

// @desc give user admin right
// @route PATCH /api/v1/users/adminrights
exports.makeUserAdmin = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const userCheck = await User.findById(userId);
        if (!userCheck)
            return res.status(404).json({ error: "User not found" });

        const user = await User.updateOne(
            {
                _id: userId,
            },
            {
                $currentDate: {
                    updatedDate: true,
                },
                $set: { admin: true },
            }
        );
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
};

// @desc update user details
// @route PATCH /api/v1/users/:id
exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userCheck = await User.findById(id);
        if (!userCheck)
            return res.status(404).json({ error: "User not found" });

        const user = await User.updateOne(
            {
                _id: id,
            },
            {
                $currentDate: {
                    updatedDate: true,
                },
                $set: req.body,
            }
        );
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
};

// @desc Get users completed courses and videos
// @route GET /api/v1/users/completed/:id
exports.getUsersCompletedItems = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "No user found" });

        return res.status(200).json({
            courses: user.coursesCompleted,
            videos: user.videosCompleted,
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

function generateToken(user) {
    // var length = isAdmin ? 8 : 16,
    //     charset =
    //         "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    //     retVal = "";
    // for (var i = 0, n = charset.length; i < length; ++i)
    //     retVal += charset.charAt(Math.floor(Math.random() * n));
    const token = jwt.sign(
        { user_id: user._id, email: user.email },
        JWT_TOKEN,
        {
            expiresIn: "24h",
        }
    );
    return token;
}

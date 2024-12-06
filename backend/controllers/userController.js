let User = require('../models/User');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { check, validationResult } = require("express-validator");

exports.registerUser = async (req, res) => {
    console.log("Incoming Request Body:", req.body);

    await check("email", "Email is required").notEmpty().run(req);
    await check("email", "Email is invalid").isEmail().run(req);
    await check("password", "Password is required").notEmpty().run(req);
    await check("confirm_password", "Confirm password is required").notEmpty().run(req);
    await check("confirm_password", "Password and confirm password do not match").equals(req.body.password).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation failed", errors: errors.array() });
    }
    try {
        const { email, password } = req.body;

        //Check if the user already exits
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(password, salt);

        let newUser = await User.create({
            email, password: hasedPassword,
        });

        return res.status(200).json({
            success: true,
            message: "User created succcessfully",
            user: newUser
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}


exports.loginUser = async (req, res, next) => {
    try {
        await check("email", "Email is required").notEmpty().run(req);
        await check("email", "Email is invalid").isEmail().run(req);
        await check("password", "Password is required").notEmpty().run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed ", errors: errors.array() });
        }

        passport.authenticate("local", (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(400).json({ message: info.message || "Authentication failed" });
            }

            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }

                return res.status(200).json({
                    success: true,
                    message: "Logged in successfully",
                    user: { _id: user._id, email: user.email },
                });
            });
        })(req, res, next);
    } catch (err) {
        console.error("Error in loginUser:", err);
        res.status(500).json({ error: "An unexpected error occurred" }); 
    }
};

exports.logoutUser = async (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/auth/login");
    });
};


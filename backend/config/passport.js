const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require("bcryptjs");

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            try {
                const user = await User.findOne({ email });

                // Match User
                if (!user) {
                    return done(null, false, { message: "User not found" });
                }

                // Match password
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Password Incorrect" });
                }
            } catch (err) {
                console.log(err);
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id); // Using async/await
            if (user) {
                done(null, user);
            } else {
                done(new Error('User not found'), false);
            }
        } catch (err) {
            done(err, false);
        }
    });
};

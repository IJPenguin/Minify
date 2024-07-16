import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../Models/userModel.js";
import { validatePassword } from "./utils.js";

const customFields = {
    usernameField: "name",
    passwordField: "password",
};

const verificationCallback = (name, password, done) => {
    console.log(name);
    User.findOne({ name: name })
        .then((user) => {
            console.log(user);
            if (!user) {
                return done(null, false);
            }
            const isValid = validatePassword(password, user.hash, user.salt);

            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => done(err));
};

const strategy = new LocalStrategy(customFields, verificationCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => done(null, user))
        .catch((err) => done(err));
});

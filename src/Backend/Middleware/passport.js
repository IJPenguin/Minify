import passport from "passport";
import { Strategy as LocalStrategy, Strategy } from "passport-local";
import User from "../Models/User.js";
import connection from "../Models/database.js";
import { validatePassword } from "./utils.js";

const customFields = {
	usernameField: "username",
	passwordField: "password",
};

const verificationCallback = (username, password, done) => {
	User.findOne(
		{ username: username }
			.then((user) => {
				if (!user) {
					return done(null, false);
				}
				const isValid = validatePassword(
					password,
					user.hash,
					user.salt
				);

				if (isValid) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			})
			.catch((err) => done(err))
	);
};

const strategy = new Strategy(customFields, verificationCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then((user) => done(null, user))
		.catch((err) => done(err));
});

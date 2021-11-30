const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const UserModel = require("../models/userModel");
const AuthService = require("./auth.service");

const authService = new AuthService(UserModel);
module.exports = function (passport) {
	passport.use(
		new localStrategy(
			{ usernameField: "email" },
			async (email, password, done) => {
				try {
					const user = await authService.findUserByCredentials(email, password);
					if (user) {
						return done(null, user);
					}
				} catch (e) {
					return done("Unable to login", null);
				}
			}
		)
	);
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		UserModel.findById(id, function (err, user) {
			done(err, user);
		});
	});
};

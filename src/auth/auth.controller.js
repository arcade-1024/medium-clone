const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModel");
const AuthService = require("./auth.service");
const passport = require("passport");
const authService = new AuthService(UserModel);
// const { service: authService } = require("../auth");

router.post("/users/login", async (req, res, next) => {
	passport.authenticate("local", {
		successRedirect: "/dashboard",
		failureRedirect: "/users/login",
	})(req, res, next);
});

router.get(
	"/users/logout",
	authService.ensureAuthenticated,
	async (req, res) => {
		req.logOut();
		res.redirect("/logout");
	}
);

module.exports = router;

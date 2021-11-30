const express = require("express");
const router = express.Router();
const UserService = require("./user.service");
const UserModel = require("../models/userModel");

const { service: authService } = require("../auth");
// const { service: userService } = require("../user");

const userService = new UserService(UserModel);

router.post("/users", authService.ensureAuthenticated, async (req, res) => {
	const status = await userService.registerUser(req.body);
	if (status.statusValue === "done") {
		res.send(status.message);
	} else {
		res.send(status.message);
	}
});

router.get("/users", authService.ensureAuthenticated, async (req, res) => {
	const allUserData = await userService.getAllUsers();
	res.send(allUserData);
});

router.get(
	"/users/:name",
	authService.ensureAuthenticated,
	async (req, res) => {
		try {
			const user = await userService.getUserByName(req.params.name);
			if (!user) throw new Error();
			res.send(user);
		} catch (e) {
			return res.status(404).send("No user Exists");
		}
	}
);

router.get("/dashboard", authService.ensureAuthenticated, (req, res) => {
	res.send("Success login");
});

router.get("/logout", (req, res) => {
	res.send("Success logout");
});
module.exports = router;

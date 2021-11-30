const UserModel = require("../models/userModel");
const AuthService = require("./auth.service");
const authController = require("./auth.controller");
module.exports = {
	controller: authController,
	service: new AuthService(UserModel),
};

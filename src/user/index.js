const UserModel = require("../models/userModel");
const userController = require("./user.controller");
const UserService = require("./user.service");
module.exports = {
	controller: userController,
	service: new UserService(UserModel),
};

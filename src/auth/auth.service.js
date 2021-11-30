const bcrypt = require("bcrypt");

class AuthService {
	constructor(userModel) {
		this.userModel = userModel;
	}
	async findUserByCredentials(email, password) {
		const user = await this.userModel.findOne({ email });
		if (!user) {
			throw new Error("No user found");
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new Error("Unable to login");
		}
		return user;
	}

	ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.send("error! please authenticate");
	}
}

module.exports = AuthService;

class UserService {
	constructor(userModel) {
		this.userModel = userModel;
	}
	async getUserByName(name) {
		return this.userModel.findOne({ name });
	}
	async getUserById(id) {
		return this.userModel.findById(id);
	}
	async registerUser(details) {
		const newUser = new this.userModel(details);
		try {
			await newUser.save();
			return { message: "successfully registered user", statusValue: "done" };
		} catch (e) {
			return { message: "error registering user", statusValue: "error" };
		}
	}
	async getAllUsers() {
		return this.userModel.find({});
	}
	
}
module.exports = UserService;

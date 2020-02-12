const userService = require('../services/users');

const userController = {
	getProfile(req, res) {
		const { user } = req;
		userService.getProfile(user, res);
	},
	updateProfile(req, res) {
		userService.editOne(req, res);
	},
	deleteAll(req, res) {
		userService.deleteAll(res);
	},
	deleteOne(req, res) {
		userService.deleteOne(req, res);
	},
};

module.exports = Object.freeze(userController);

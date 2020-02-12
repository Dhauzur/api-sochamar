const _ = require('underscore');
const userService = require('../services/users');

const userController = {
	getProfile(req, res) {
		const { user } = req;
		userService.getProfile(user, res);
	},
	updateProfile(req, res) {
		const { user } = req;
		const profile = _.pick(req.body, ['name', 'img', 'password']);
		userService.updateProfile(user, profile, res);
	},
	deleteAll(req, res) {
		userService.deleteAll(res);
	},
	deleteOne(req, res) {
		userService.deleteOne(req, res);
	},
};

module.exports = Object.freeze(userController);

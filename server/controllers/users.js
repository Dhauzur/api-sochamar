const _ = require('underscore');
const userService = require('../services/users');

const userController = {
	getProfile(req, res) {
		const { user } = req;
		userService.getProfile(user, res);
	},
	updateProfile(req, res) {
		const { user } = req;
		const profile = _.pick(req.body, ['name', 'lastName']);
		//If the request doesnt have a file we
		userService.updateProfile(user, profile, res);
	},
	updateAvatar(req, res) {
		if (req.file) {
			const { user } = req;
			const avatar = req.file.originalname;
			userService.updateAvatar(user, avatar, res);
		}
	},
	deleteAll(req, res) {
		userService.deleteAll(res);
	},
	deleteOne(req, res) {
		userService.deleteOne(req, res);
	},
};

module.exports = Object.freeze(userController);

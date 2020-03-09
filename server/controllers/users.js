import userService from '../services/users';

const userController = {
	getProfile(req, res) {
		const { user } = req;
		userService.getProfile(user._id, res);
	},
	updateProfile(req, res) {
		const { user } = req;
		const profile = req.body;
		//If the request doesnt have a file we
		userService.updateProfile(user._id, profile, res);
	},
	updateAvatar(req, res) {
		if (req.file) {
			const { user } = req;
			const avatar = req.file.cloudStoragePublicUrl;
			userService.updateAvatar(user._id, avatar, res);
		}
	},
	deleteAll(req, res) {
		userService.deleteAll(res);
	},
	deleteOne(req, res) {
		userService.deleteOne(req, res);
	},
	updatePassword(req, res) {
		const { user } = req;
		const password = req.body.password;
		userService.updatePassword(user._id, password, res);
	},
};

export default Object.freeze(userController);

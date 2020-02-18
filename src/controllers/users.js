import userService from '../services/users';

const userController = {
	getAll(req, res) {
		userService.getAll(res);
	},
	createOne(req, res) {
		const user = req.body;
		userService.createOne(user, res);
	},
	deleteAll(req, res) {
		userService.deleteAll(res);
	},
	editOne(req, res) {
		userService.editOne(req, res);
	},
	deleteOne(req, res) {
		userService.deleteOne(req, res);
	},
};

export default Object.freeze(userController);

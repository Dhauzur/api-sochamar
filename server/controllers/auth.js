const _ = require('underscore');
const authService = require('../services/auth');

const authController = {
	register(req, res) {
		const user = _.pick(req.body, ['name', 'email', 'password']);
		return authService.register(user, res);
	},
	generateJwt(req, res) {
		/*We dont need to .pick here, because user is attached from the local middleware*/
		const { user } = req;
		const token = authService.generateJwt(user);
		const response = {
			token,
		};
		res.json(response);
	},
	sendPasswordRecover(req, res) {
		const { email } = req.body;
		return authService.sendPasswordRecover(email, res);
	},
	changeUserPassword(req, res) {
		const { password } = req.body;
		const user = req.user;
		return authService.changeUserPassword(user, password, res);
	},
};

module.exports = Object.freeze(authController);

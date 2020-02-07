const _ = require('underscore');
const authService = require('../services/auth');

const authController = {
	register(req, res) {
		const user = _.pick(req.body, ['name', 'email', 'password']);
		return authService.register(user, res);
	},
	generateJwt(req, res) {
		/*We dont need to .pick here, because user is attached from the local middleware*/
		const user = req.user;
		const token = authService.generateJwt(user);
		const response = {
			user,
			token,
		};
		res.json(response);
	},
	sendPasswordRecover(req, res) {
		const { email } = req.body;
		return authService.sendPasswordRecover(email, res);
	},
};

module.exports = Object.freeze(authController);

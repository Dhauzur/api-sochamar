const _ = require('underscore');
const authService = require('../services/auth');

const authController = {
	register(req, res) {
		const user = _.pick(req.body, ['name', 'email', 'password']);
		return authService.register(user, res);
	},
	generateJwt(req, res) {
		const user = req.user;
		const token = authService.generateJwt(user);
		const response = {
			user,
			token,
		};
		res.json(response);
	},
};

module.exports = Object.freeze(authController);

const authService = require('../services/auth');

const authController = {
	register(req, res) {
		authService.register(req, res);
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

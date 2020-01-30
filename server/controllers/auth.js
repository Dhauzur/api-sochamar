const authService = require('../services/auth');

const authController = {
	register(req, res) {
		authService.register(req, res);
	},
	login(req, res) {
		authService.login(req, res);
	},
};

module.exports = Object.freeze(authController);

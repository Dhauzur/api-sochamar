const authService = require('../services/auth');

const authController = {
	register(req, res) {
		authService.register(req, res);
	},
	generateJwt(req, res) {
		const user = req.user;
		const jwt = authService.generateJwt(user);
		res.json(jwt);
	},
};

module.exports = Object.freeze(authController);

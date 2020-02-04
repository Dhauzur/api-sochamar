const authService = require('../services/auth');

const authController = {
	async register(req, res) {
		const user = req.body;
		try {
			const result = await authService.register(user);
			const response = { ok: true, User: result };
			await res.json(response);
		} catch (e) {
			res.status(400).json({
				ok: false,
				e,
			});
		}
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

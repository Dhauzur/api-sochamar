require('../config/config');
const jwt = require('jsonwebtoken');

const generateJwt = user => {
	const payload = {
		username: user.nombre,
		sub: user._id,
		exp: Date.now() + parseInt(process.env.JWT_EXPIRATION),
	};

	return jwt.sign(payload, process.env.JWT_SECRET);
};

const authService = {
	generateJwt,
};

module.exports = Object.freeze(authService);

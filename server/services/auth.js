require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const generateJwt = user => {
	const payload = {
		username: user.nombre,
		sub: user._id,
		exp: Date.now() + parseInt(process.env.JWT_EXPIRATION),
	};

	return jwt.sign(payload, process.env.JWT_SECRET);
};

const register = (user, res) => {
	let newUser = new User({
		name: user.name,
		email: user.email,
		password: bcrypt.hashSync(user.password, 10),
		role: user.role,
	});

	return newUser
		.save()
		.then(user => res.json({ token: generateJwt(user), user }))
		.catch(e =>
			res.status(409).json({
				ok: false,
				e,
			})
		);
};

const authService = {
	generateJwt,
	register,
};

module.exports = Object.freeze(authService);

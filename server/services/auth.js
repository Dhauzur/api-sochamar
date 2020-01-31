const User = require('../models/user');

const generateJwt = user => {
	console.log('comienza la generación del payload');
	const payload = {
		username: user.nombre,
		sub: user._id,
		exp: 'aqui va la expiracion del jwt',
	};
	const token = 'Mañana aqui se programa la logica de jwt.sign';
	return payload;
};

const authService = {
	generateJwt,
};

module.exports = Object.freeze(authService);

const sender = require('../mailer/index');
const from = 'pruebanodemailersochamar@gmail.com';

const createPasswordRecoverMessage = (email, token) => {
	return {
		from: from,
		to: email,
		subject: 'Password Recovery',
		text: 'probando el envio de token: ' + token,
		html: '<p>probando el envio de token: </p>' + token,
	};
};

const createNewAccountMessage = email => {
	return {
		from: from,
		to: email,
		subject: 'Password Recovery',
		text: 'Cuenta creada con exito, ya puedes usar nuestro sistema.',
		html: '<p>Cuenta creada con exito, ya puedes usar nuestro sistema.</p>',
	};
};

const sendPasswordRecover = (email, token) => {
	const message = createPasswordRecoverMessage(email, token);
	sender.sendMail(message);
};

const sendNewAccountMessage = email => {
	const message = createNewAccountMessage(email);
	sender.sendMail(message);
};

const mailerService = {
	sendPasswordRecover,
	sendNewAccountMessage,
};

module.exports = Object.freeze(mailerService);

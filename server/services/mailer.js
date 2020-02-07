const sender = require('../mailer/index');
const from = 'pruebanodemailersochamar@gmail.com';
const createPasswordRecoverMessage = email => {
	return {
		from: from,
		to: email,
		subject: 'Password Recovery',
		text:
			'Aqui va llegar un boton con un la ruta ejemplo: rutaFront+?token=478123nj3',
		html:
			'<p>Aqui va llegar un boton con un la ruta ejemplo: rutaFront+?token=478123nj3</p>',
	};
};

const createNewAccountMessage = email => {
	return {
		from: from,
		to: email,
		subject: 'Password Recovery',
		text: 'Cuenta creada con exito, ya puedes usar nuestro sistema',
		html: '<p>Cuenta creada con exito, ya puedes usar nuestro sistema</p>',
	};
};

const sendPasswordRecover = email => {
	const message = createPasswordRecoverMessage(email);
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

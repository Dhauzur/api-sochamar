import '../config/config.js';
import sender from '../mailer/index';
const from = 'pruebanodemailersochamar@gmail.com';
const createPasswordRecoveryHtml = (token, url) => {
	const recoveryUrl = url + '/passwordReset?token=' + token;
	return `
<p>Usted ha enviado una solicitud de cambio de contraseña. Presione aqui para recuperar contraseña.</p>
<a href="${recoveryUrl}" target="_blank">Recuperar Contraseña</a>
`;
};

const createPasswordRecoverMessage = (email, html) => {
	return {
		from: from,
		to: email,
		subject: 'Password Recovery',
		text: '',
		html: html,
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
	const frontendUrl = process.env.FRONTEND_URL;
	const html = createPasswordRecoveryHtml(token, frontendUrl);
	const message = createPasswordRecoverMessage(email, html);
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

export default Object.freeze(mailerService);

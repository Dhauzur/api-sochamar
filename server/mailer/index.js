const nodemailer = require('nodemailer');

const transportConfig = {
	service: 'gmail',
	auth: {
		user: 'pruebanodemailersochamar@gmail.com',
		pass: 'prueba12345',
	},
};

const transporter = nodemailer.createTransport(transportConfig);

const verifyCallback = (error, success) => {
	if (error) {
		/*Aca lo ideal seria un sistema de logger que comunique esto, para atender este error altiro*/
		console.log(error);
	} else {
		console.log('Transport works, server can send emails now');
	}
};

transporter.verify(verifyCallback());

module.exports = transporter;

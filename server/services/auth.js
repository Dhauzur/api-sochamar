import '../config/config.js';
import bcrypt from 'bcrypt';
import User from '../models/user';
import mailerService from './mailer';
import { sign } from 'jsonwebtoken';
const generateJwt = user => {
	const payload = {
		username: user.name,
		sub: user._id,
	};

	return sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRATION,
	});
};

const generatePasswordRecoverJwt = user => {
	const payload = {
		username: user.name,
		sub: user._id,
	};

	return sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.PASSWORD_RECOVERY_JWT_EXPIRATION,
	});
};

const getUserByEmail = email => {
	return User.findOne({ email: email });
};

const register = (user, res) => {
	const newUser = new User({
		name: user.name,
		email: user.email,
		password: bcrypt.hashSync(user.password, 10),
		role: user.role,
		analyst: user.analyst,
	});

	const sendEmailAndApiResponse = user => {
		mailerService.sendNewAccountMessage(user.email);
		return res.json({ token: generateJwt(user), user });
	};

	return newUser
		.save()
		.then(user => sendEmailAndApiResponse(user))
		.catch(e =>
			res.status(409).json({
				ok: false,
				e,
			})
		);
};

const sendPasswordRecover = (email, res) => {
	getUserByEmail(email).then(user => {
		if (!user) {
			return res.sendStatus(404);
		} else {
			const token = generatePasswordRecoverJwt(user);
			mailerService.sendPasswordRecover(email, token);
			return res.sendStatus(200);
		}
	});
};

const changeUserPassword = (user, newPassword, res) => {
	User.findByIdAndUpdate(user._id, {
		password: bcrypt.hashSync(newPassword, 10),
	})
		.then(() => res.sendStatus(200))
		.catch(() => res.sendStatus(404));
	/*We handle the possible not found User error*/
};

const authService = {
	generateJwt,
	register,
	sendPasswordRecover,
	changeUserPassword,
};

export default Object.freeze(authService);

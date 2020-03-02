import { Router } from 'express';
import passport from 'passport';
import authController from '../controllers/auth';

const authRouter = Router();
/*Ojo, aca podemos optimizar los nombres de ruta quitando cosas como /create o /delete/all*/
/*Los verbos de por si ya estan dando a entender la accion que se realiza sobre esta ruta*/

authRouter.post(
	'/auth/login',
	passport.authenticate('local'),
	authController.generateJwt
);

authRouter.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/plus.login',
			'https://www.googleapis.com/auth/userinfo.email',
		],
	}),
	authController.generateJwt
);

authRouter.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		session: false,
		realm: 'http://localhost:8080/#/',
		failureRedirect: 'http://localhost:8080/#/login',
	}),
	authController.googleAuthCallback
);

authRouter.post('/auth/register', authController.register);

authRouter.post(
	'/auth/send/passwordRecover',
	authController.sendPasswordRecover
);

authRouter.put(
	'/auth/user/password',
	passport.authenticate('jwt'),
	authController.changeUserPassword
);

export default authRouter;

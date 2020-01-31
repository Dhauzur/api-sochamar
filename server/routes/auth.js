const express = require('express');
const passport = require('passport');

const authRouter = express.Router();
const authController = require('../controllers/auth');
/*Ojo, aca podemos optimizar los nombres de ruta quitando cosas como /create o /delete/all*/
/*Los verbos de por si ya estan dando a entender la accion que se realiza sobre esta ruta*/

authRouter.post(
	'/auth/login',
	passport.authenticate('local'),
	authController.generateJwt
);

authRouter.post('/auth/register');

module.exports = authRouter;

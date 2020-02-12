const express = require('express');
const passport = require('passport');

const userRouter = express.Router();
const userController = require('../controllers/users');

/* Ojo, aca podemos optimizar los nombres de ruta quitando cosas como /create o /delete/all*/
/* Los verbos de por si ya estan dando a entender la accion que se realiza sobre esta ruta*/
userRouter.get(
	'/user/profile',
	passport.authenticate('jwt', { session: false }),
	userController.getProfile
);

userRouter.put(
	'/user/profile',
	passport.authenticate('jwt', { session: false }),
	userController.updateProfile
);

module.exports = userRouter;

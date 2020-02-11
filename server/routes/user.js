const express = require('express');
const passport = require('passport');

const userRouter = express.Router();
const userController = require('../controllers/users');

/* Ojo, aca podemos optimizar los nombres de ruta quitando cosas como /create o /delete/all*/
/* Los verbos de por si ya estan dando a entender la accion que se realiza sobre esta ruta*/
userRouter.get(
	'/user',
	passport.authenticate('jwt', { session: false }),
	userController.getAll
);
userRouter.post(
	'/user',
	passport.authenticate('jwt', { session: false }),
	userController.createOne
);
userRouter.put(
	'/user/:id',
	passport.authenticate('jwt', { session: false }),
	userController.editOne
);
userRouter.delete(
	'/user/:id',
	passport.authenticate('jwt', { session: false }),
	userController.deleteOne
);
userRouter.delete(
	'/user/delete/all',
	passport.authenticate('jwt', { session: false }),
	userController.deleteAll
);

module.exports = userRouter;

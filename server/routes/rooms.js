const express = require('express');
const passport = require('passport');

const roomsRouter = express.Router();
const roomsController = require('../controllers/rooms');

/* Ojo, aca podemos optimizar los nombres de ruta quitando cosas como /create o /delete/all*/
/* Los verbos de por si ya estan dando a entender la accion que se realiza sobre esta ruta*/
roomsRouter.get(
	'/rooms',
	passport.authenticate('jwt', { session: false }),
	roomsController.getAll
);
roomsRouter.post(
	'/rooms/create',
	passport.authenticate('jwt', { session: false }),
	roomsController.create
);
roomsRouter.delete(
	'/rooms/delete',
	passport.authenticate('jwt', { session: false }),
	roomsController.delete
);
roomsRouter.delete(
	'/rooms/delete/all',
	passport.authenticate('jwt', { session: false }),
	roomsController.deleteAll
);

module.exports = roomsRouter;

import { Router } from 'express';
import passport from 'passport';
import roomsController from '../controllers/room';

const roomsRouter = Router();
/* Ojo, aca podemos optimizar los nombres de ruta quitando cosas como /create o /delete/all*/
/* Los verbos de por si ya estan dando a entender la accion que se realiza sobre esta ruta*/
roomsRouter.get(
	'/periods/:placeId',
	passport.authenticate('jwt', { session: false }),
	roomsController.getAll
);
roomsRouter.post(
	'/periods',
	passport.authenticate('jwt', { session: false }),
	roomsController.create
);
roomsRouter.delete(
	'/periods/all',
	passport.authenticate('jwt', { session: false }),
	roomsController.deleteAll
);
roomsRouter.delete(
	'/periods/one/:id',
	passport.authenticate('jwt', { session: false }),
	roomsController.deleteOne
);

export default roomsRouter;

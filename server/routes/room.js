import { Router } from 'express';
import passport from 'passport';
import roomsController from '../controllers/room';
import grantAccess from '../middleware/strategies/rbac';

const roomsRouter = Router();
/* Ojo, aca podemos optimizar los nombres de ruta quitando cosas como /create o /delete/all*/
/* Los verbos de por si ya estan dando a entender la accion que se realiza sobre esta ruta*/
roomsRouter.get(
	'/rooms/:placeId',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('readAny', 'room'),
	],
	roomsController.getAll
);
roomsRouter.post(
	'/rooms',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('createAny', 'room'),
	],
	roomsController.create
);
roomsRouter.delete(
	'/rooms/all',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('deleteAny', 'room'),
	],
	roomsController.deleteAll
);
roomsRouter.delete(
	'/rooms/one/:id',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('deleteAny', 'room'),
	],
	roomsController.deleteOne
);

export default roomsRouter;

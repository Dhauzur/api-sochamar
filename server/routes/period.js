import { Router } from 'express';
import passport from 'passport';
import periodsController from '../controllers/period';
import periodSchema from '../schemas/period';
import validation from '../middleware/validation';
import grantAccess from '../middleware/strategies/rbac';

const periodsRouter = Router();
/* Ojo, aca podemos optimizar los nombres de ruta quitando cosas como /create o /delete/all*/
/* Los verbos de por si ya estan dando a entender la accion que se realiza sobre esta ruta*/
periodsRouter.get(
	'/periods/:placeId',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('readAny', 'periods'),
	],
	periodsController.getAll
);
periodsRouter.post(
	'/periods',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('createAny', 'periods'),
		validation(periodSchema.create, 'body'),
	],
	periodsController.create
);
periodsRouter.delete(
	'/periods/all',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('deleteAny', 'periods'),
	],
	periodsController.deleteAll
);
periodsRouter.delete(
	'/periods/one/:id',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('deleteAny', 'periods'),
	],
	periodsController.deleteOne
);

export default periodsRouter;

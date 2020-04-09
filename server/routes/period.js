import { Router } from 'express';
import passport from 'passport';
import periodsController from '../controllers/period';
import periodSchema from '../schemas/period';
import validation from '../middleware/validation';

const periodsRouter = Router();
/* Ojo, aca podemos optimizar los nombres de ruta quitando cosas como /create o /delete/all*/
/* Los verbos de por si ya estan dando a entender la accion que se realiza sobre esta ruta*/
periodsRouter.get(
	'/periods/:placeId',
	passport.authenticate('jwt', { session: false }),
	periodsController.getAll
);
periodsRouter.post(
	'/periods',
	[
		passport.authenticate('jwt', { session: false }),
		validation(periodSchema.create, 'body'),
	],
	periodsController.create
);
periodsRouter.delete(
	'/periods/all',
	passport.authenticate('jwt', { session: false }),
	periodsController.deleteAll
);
periodsRouter.delete(
	'/periods/one/:id',
	passport.authenticate('jwt', { session: false }),
	periodsController.deleteOne
);

export default periodsRouter;

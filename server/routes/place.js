import { Router } from 'express';
import passport from 'passport';
import placeController from '../controllers/place';
import validation from '../middleware/validation';
import placeSchema from '../schemas/place';

const placeRouter = Router();
/*Ojo, aca podemos optimizar los nombres de ruta quitando cosas como /create o /delete/all*/
/*Los verbos de por si ya estan dando a entender la accion que se realiza sobre esta ruta*/
placeRouter.get(
	'/place',
	passport.authenticate('jwt', { session: false }),
	placeController.getAll
);
placeRouter.get(
	'/place/:id',
	passport.authenticate('jwt', { session: false }),
	placeController.getOne
);
placeRouter.post(
	'/place',
	[
		passport.authenticate('jwt', { session: false }),
		validation(placeSchema.register, 'body'),
	],
	placeController.create
);
placeRouter.delete(
	'/place/all',
	passport.authenticate('jwt', { session: false }),
	placeController.deleteAll
);
placeRouter.delete(
	'/place/one/:id',
	passport.authenticate('jwt', { session: false }),
	placeController.deleteOne
);

export default placeRouter;

import { Router } from 'express';
import passport from 'passport';
import activitiesController from '../controllers/activities';
import activitiesSchema from '../schemas/activities';
import validation from '../middleware/validation';

const activitiesRouter = Router();
/*Ojo, aca podemos optimizar los nombres de ruta quitando cosas como /create o /delete/all*/
/*Los verbos de por si ya estan dando a entender la accion que se realiza sobre esta ruta*/
activitiesRouter.get(
	'/activities',
	passport.authenticate('jwt', { session: false }),
	activitiesController.getAll
);
/*Podemos cambiar el nombre a singular y borrar el /create*/
activitiesRouter.post(
	'/activities/create',
	[
		passport.authenticate('jwt', { session: false }),
		validation(activitiesSchema.create, 'body'),
	],
	activitiesController.create
);
activitiesRouter.delete(
	'/activities/delete/all',
	passport.authenticate('jwt', { session: false }),
	activitiesController.deleteAll
);

export default activitiesRouter;

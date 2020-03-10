import { Router } from 'express';
import passport from 'passport';
import placeServicesSchema from '../schemas/placeServices';
import placeServicesController from '../controllers/placeServices';
import validation from '../middleware/validation';

const placeServicesRouter = Router();

placeServicesRouter.get(
	'/placeServices',
	passport.authenticate('jwt', { session: false }),
	placeServicesController.getAll
);

placeServicesRouter.post(
	'/placeServices',
	[
		passport.authenticate('jwt', { session: false }),
		validation(placeServicesSchema.create, 'body'),
	],
	placeServicesController.createOne
);

placeServicesRouter.put(
	'/placeServices/:id',
	[
		passport.authenticate('jwt', { session: false }),
		validation(placeServicesSchema.update, 'body'),
	],
	placeServicesController.updateOne
);

placeServicesRouter.delete(
	'/placeServices/:id',
	[passport.authenticate('jwt', { session: false })],
	placeServicesController.deleteOne
);

placeServicesRouter.delete(
	'/placeServices/delete/all',
	passport.authenticate('jwt', { session: false }),
	placeServicesController.deleteAll
);

export default placeServicesRouter;

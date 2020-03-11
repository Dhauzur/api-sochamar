import { Router } from 'express';
import passport from 'passport';
import placeServicesSchema from '../schemas/placeServices';
import placeServicesController from '../controllers/placeServices';
import validation from '../middleware/validation';

const placeServicesRouter = Router();

placeServicesRouter.get(
	'/placeServices/:placeId',
	passport.authenticate('jwt', { session: false }),
	placeServicesController.getAll
);

placeServicesRouter.get(
	'/placeService/:id',
	passport.authenticate('jwt', { session: false }),
	placeServicesController.getOne
);

placeServicesRouter.post(
	'/placeService',
	[
		passport.authenticate('jwt', { session: false }),
		validation(placeServicesSchema.create, 'body'),
	],
	placeServicesController.createOne
);

placeServicesRouter.put(
	'/placeService/:id',
	[
		passport.authenticate('jwt', { session: false }),
		validation(placeServicesSchema.update, 'body'),
	],
	placeServicesController.updateOne
);

placeServicesRouter.delete(
	'/placeService/:id',
	[passport.authenticate('jwt', { session: false })],
	placeServicesController.deleteOne
);

export default placeServicesRouter;

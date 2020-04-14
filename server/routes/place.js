import { Router } from 'express';
import passport from 'passport';
import placeController from '../controllers/place';
import validation from '../middleware/validation';
import placeSchema from '../schemas/place';
import grantAccess from '../middleware/strategies/rbac';

const placeRouter = Router();

placeRouter.get(
	'/place',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('readAny', 'place'),
	],
	placeController.getAll
);
placeRouter.get(
	'/place/:id',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('readAny', 'place'),
	],
	placeController.getOne
);

placeRouter.post(
	'/place',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('createAny', 'place'),
		validation(placeSchema.register, 'body'),
	],
	placeController.create
);

placeRouter.post(
	'/place/:id/service',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('createAny', 'place'),
		validation(placeSchema.addService, 'body'),
	],
	placeController.createService
);

placeRouter.put(
	'/place/:id/service/:serviceId',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('updateAny', 'place'),
		validation(placeSchema.updateService, 'body'),
	],
	placeController.updateService
);

placeRouter.delete(
	'/place/:id/service/:serviceId',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('deleteAny', 'place'),
	],
	placeController.deleteService
);

placeRouter.delete(
	'/place/all',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('deleteAny', 'place'),
	],
	placeController.deleteAll
);
placeRouter.delete(
	'/place/one/:id',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('deleteAny', 'place'),
	],
	placeController.deleteOne
);

export default placeRouter;

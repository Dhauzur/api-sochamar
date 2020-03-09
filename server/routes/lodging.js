import { Router } from 'express';
import passport from 'passport';
import lodgingController from '../controllers/lodging';
import validation from '../middleware/validation';
import lodgingSchema from '../schemas/lodging';

const lodgingRouter = Router();

lodgingRouter.delete(
	'/lodging/delete/place/:id',
	passport.authenticate('jwt', { session: false }),
	lodgingController.deleteOneWithPlaceId
);
lodgingRouter.delete(
	'/lodging/delete/all',
	passport.authenticate('jwt', { session: false }),
	lodgingController.deleteAll
);
lodgingRouter.delete(
	'/lodging/delete/places/:place',
	passport.authenticate('jwt', { session: false }),
	lodgingController.deleteAllWithPlace
);
lodgingRouter.get(
	'/lodgings',
	passport.authenticate('jwt', { session: false }),
	lodgingController.getAll
);
lodgingRouter.get(
	'/lodgings/place/:id',
	passport.authenticate('jwt', { session: false }),
	lodgingController.getAllForPlace
);
lodgingRouter.post(
	'/lodging',
	[
		passport.authenticate('jwt', { session: false }),
		validation(lodgingSchema.create, 'body'),
	],
	lodgingController.create
);

export default lodgingRouter;

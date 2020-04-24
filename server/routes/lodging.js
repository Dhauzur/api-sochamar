import { Router } from 'express';
import passport from 'passport';
import lodgingController from '../controllers/lodging';
import validation from '../middleware/validation';
import lodgingSchema from '../schemas/lodging';
import grantAccess from '../middleware/strategies/rbac';

const lodgingRouter = Router();

lodgingRouter.delete(
	'/lodging/delete/place/:id',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('deleteAny', 'lodging'),
	],
	lodgingController.deleteOneWithPlaceId
);
lodgingRouter.delete(
	'/lodging/delete/all',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('deleteAny', 'lodging'),
	],
	lodgingController.deleteAll
);
lodgingRouter.delete(
	'/lodging/delete/places/:place',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('deleteAny', 'lodging'),
	],
	lodgingController.deleteAllWithPlace
);
lodgingRouter.get(
	'/lodgings',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('readAny', 'lodging'),
	],
	lodgingController.getAll
);
lodgingRouter.get(
	'/lodgings/place/:id',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('readAny', 'lodging'),
	],
	lodgingController.getAllForPlace
);
lodgingRouter.post(
	'/lodging',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('createAny', 'lodging'),
		validation(lodgingSchema.create, 'body'),
	],
	lodgingController.create
);

lodgingRouter.put(
	'/lodging/:id',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('updateAny', 'lodging'),
		validation(lodgingSchema.update, 'body'),
	],
	lodgingController.update
);

lodgingRouter.get(
	'/lodgings/:placeId/reports/pdf',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('readAny', 'lodging'),
	],
	lodgingController.generatePdfReport
);

lodgingRouter.get(
	'/lodgings/:placeId/reports/csv',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('readAny', 'lodging'),
	],
	lodgingController.generateCsvReport
);

export default lodgingRouter;

import express from 'express';
import passport from 'passport';
import paymentsController from '../controllers/payments';
import multer from '../middleware/multer';
import storage from '../middleware/storage';
import validation from '../middleware/validation';
import paymentsSchema from '../schemas/payments';
import grantAccess from '../middleware/strategies/rbac';

const paymentsRouter = express.Router();
paymentsRouter.get(
	'/payments/:id',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('readAny', 'payments'),
	],
	paymentsController.getAll
);

paymentsRouter.post(
	'/payments/create',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('createAny', 'payments'),
		multer.single('voucher'),
		storage,
		validation(paymentsSchema.create, 'body'),
	],
	paymentsController.create
);

paymentsRouter.put(
	'/payments/:id',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('updateAny', 'payments'),
		validation(paymentsSchema.update, 'body'),
	],
	paymentsController.editOne
);

paymentsRouter.delete(
	'/payments/:id',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('deleteAny', 'payments'),
	],
	paymentsController.deleteOne
);

paymentsRouter.get(
	'/payments/:placeId/reports/pdf',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('readAny', 'payments'),
	],
	paymentsController.generatePdfReport
);

paymentsRouter.get(
	'/payments/:placeId/reports/csv',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('readAny', 'payments'),
	],
	paymentsController.generateCsvReport
);

export default paymentsRouter;

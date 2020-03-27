import express from 'express';
import passport from 'passport';
import paymentsController from '../controllers/payments';
import multer from '../middleware/multer';
import storage from '../middleware/storage';
import validation from '../middleware/validation';
import paymentsSchema from '../schemas/payments';

const paymentsRouter = express.Router();
paymentsRouter.get(
	'/payments/:id',
	passport.authenticate('jwt', { session: false }),
	paymentsController.getAll
);

paymentsRouter.post(
	'/payments/create',
	[
		passport.authenticate('jwt', { session: false }),
		multer.single('voucher'),
		validation(paymentsSchema.create, 'body'),
		storage,
	],
	paymentsController.create
);

paymentsRouter.put(
	'/payments/:id',
	[
		passport.authenticate('jwt', { session: false }),
		validation(paymentsSchema.update, 'body'),
	],
	paymentsController.editOne
);

paymentsRouter.delete(
	'/payments/:id',
	passport.authenticate('jwt', { session: false }),
	paymentsController.deleteOne
);

export default paymentsRouter;

import express from 'express';
import passport from 'passport';
import paymentsController from '../controllers/payments';
import upload from '../middleware/paymentsMulterConfig';

const paymentsRouter = express.Router();
paymentsRouter.get(
	'/payments',
	passport.authenticate('jwt', { session: false }),
	paymentsController.getAll
);

paymentsRouter.post(
	'/payments/create',
	[
		passport.authenticate('jwt', { session: false }),
		upload.fields([
			{
				name: 'voucher',
				maxCount: 1,
			},
		]),
	],
	(req, res) => paymentsController.create(req, res)
);

paymentsRouter.put(
	'/payments/:id',
	[
		passport.authenticate('jwt', { session: false }),
		upload.fields([
			{
				name: 'voucher',
				maxCount: 1,
			},
		]),
	],
	(req, res) => paymentsController.editOne(req, res)
);

paymentsRouter.delete(
	'/payments/:id',
	passport.authenticate('jwt', { session: false }),
	paymentsController.deleteOne
);

paymentsRouter.delete(
	'/payments/delete/all',
	passport.authenticate('jwt', { session: false }),
	paymentsController.deleteAll
);

export default paymentsRouter;

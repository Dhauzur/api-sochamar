import { Router } from 'express';
import passport from 'passport';
import passengersController from '../controllers/passengers';
import upload from '../middleware/passengersMulterConfig';

const passengersRouter = Router();
// route for get all passengers
passengersRouter.get('/passengers', passengersController.getAll);

// route create a passenger
passengersRouter.post(
	'/passengers/create',
	[
		passport.authenticate('jwt', { session: false }),
		upload.fields([
			{
				name: 'passenger',
				maxCount: 1,
			},
			{
				name: 'documents',
				maxCount: 5,
			},
		]),
	],
	(req, res) => passengersController.create(req, res)
);

// route for update a passenger
passengersRouter.put(
	'/passengers/:id',
	[
		passport.authenticate('jwt', { session: false }),
		upload.fields([
			{
				name: 'passenger',
				maxCount: 1,
			},
			{
				name: 'documents',
				maxCount: 5,
			},
		]),
	],
	(req, res) => passengersController.editOne(req, res)
);

// delete a passenger
passengersRouter.delete(
	'/passengers/:id',
	passport.authenticate('jwt', { session: false }),
	passengersController.deleteOne
);

// delete all passengers
passengersRouter.delete(
	'/passengers/delete/all',
	passport.authenticate('jwt', { session: false }),
	passengersController.deleteAll
);

export default passengersRouter;

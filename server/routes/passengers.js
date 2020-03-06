import { Router } from 'express';
import passport from 'passport';
import passengersController from '../controllers/passengers';
import multer from '../middleware/multer';
import { uploadPassenger, uploadDocuments } from '../middleware/gscPassengers';

const passengersRouter = Router();
// route for get all passengers
passengersRouter.get(
	'/passengers',
	passport.authenticate('jwt', { session: false }),
	passengersController.getAll
);

// route create a passenger
passengersRouter.post(
	'/passengers/create',
	[
		passport.authenticate('jwt', { session: false }),
		multer.fields([
			{
				name: 'passenger',
				maxCount: 1,
			},
			{
				name: 'documents',
				maxCount: 5,
			},
		]),
		uploadPassenger,
		uploadDocuments,
	],
	passengersController.create
);

// route for update a passenger
passengersRouter.put(
	'/passengers/:id',
	[
		passport.authenticate('jwt', { session: false }),
		multer.fields([
			{
				name: 'passenger',
				maxCount: 1,
			},
			{
				name: 'documents',
				maxCount: 5,
			},
		]),
		uploadPassenger,
		uploadDocuments,
	],
	passengersController.editOne
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

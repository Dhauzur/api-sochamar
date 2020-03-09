import { Router } from 'express';
import passport from 'passport';
import personsController from '../controllers/person';
import multer from '../middleware/multer';
import { uploadAvatar, uploadDocuments } from '../middleware/gscPerson';
import personSchema from '../schemas/person';
import validation from '../middleware/validation';

const personsRouter = Router();
// route for get all persons
personsRouter.get(
	'/persons',
	passport.authenticate('jwt', { session: false }),
	personsController.getAll
);

// route create a person
personsRouter.post(
	'/persons/create',
	[
		passport.authenticate('jwt', { session: false }),
		multer.fields([
			{
				name: 'avatar',
				maxCount: 1,
			},
			{
				name: 'documents',
				maxCount: 5,
			},
		]),
		validation(personSchema.create, 'body'),
		uploadAvatar,
		uploadDocuments,
	],
	personsController.create
);

// route for update a person
personsRouter.put(
	'/persons/:id',
	[
		passport.authenticate('jwt', { session: false }),
		validation(personSchema.update, 'body'),
		multer.fields([
			{
				name: 'avatar',
				maxCount: 1,
			},
			{
				name: 'documents',
				maxCount: 5,
			},
		]),
		uploadAvatar,
		uploadDocuments,
	],
	personsController.editOne
);

// delete a person
personsRouter.delete(
	'/persons/:id',
	passport.authenticate('jwt', { session: false }),
	personsController.deleteOne
);

// delete all persons
personsRouter.delete(
	'/persons/delete/all',
	passport.authenticate('jwt', { session: false }),
	personsController.deleteAll
);

export default personsRouter;

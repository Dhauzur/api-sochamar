import { Router } from 'express';
import passport from 'passport';
import personsController from '../controllers/person';
import multer from '../middleware/multer';
import { uploadAvatar, uploadDocuments } from '../middleware/gscPerson';
import personSchema from '../schemas/person';
import validation from '../middleware/validation';
import grantAccess from '../middleware/strategies/rbac';

const personsRouter = Router();
// route for get all persons
personsRouter.get(
	'/persons',
	passport.authenticate('jwt', { session: false }),
	grantAccess('readOwn', 'person'),
	personsController.getAll
);

personsRouter.get(
	'/persons/:idCompany',
	passport.authenticate('jwt', { session: false }),
	grantAccess('readOwn', 'person'),
	personsController.getPersonsCompany
);

personsRouter.get(
	'/person/:id',
	passport.authenticate('jwt', { session: false }),
	grantAccess('readOwn', 'person'),
	personsController.getOne
);

// route create a person
personsRouter.post(
	'/persons/create',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('createOwn', 'person'),
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
		grantAccess('updateOwn', 'person'),
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
		validation(personSchema.update, 'body'),
		uploadAvatar,
		uploadDocuments,
	],
	personsController.editOne
);

// delete a person
personsRouter.delete(
	'/persons/:id',
	passport.authenticate('jwt', { session: false }),
	grantAccess('deleteAny', 'person'),
	personsController.deleteOne
);

// delete all persons
personsRouter.delete(
	'/persons/delete/all',
	grantAccess('deleteAny', 'person'),
	passport.authenticate('jwt', { session: false }),
	personsController.deleteAll
);

export default personsRouter;

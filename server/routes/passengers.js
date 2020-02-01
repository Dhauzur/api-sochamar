const express = require('express');
const passengersRouter = express.Router();
const passengersController = require('../controllers/passengers');
const upload = require('./middleware/passengersMulterConfig');

// route for get all passengers
passengersRouter.get('/passengers', passengersController.getAll);

// route create a passenger
passengersRouter.post(
	'/passengers/create',
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
	(req, res) => passengersController.create(req, res)
);

// route for update a passenger
passengersRouter.put(
	'/passengers/:id',
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
	(req, res) => passengersController.editOne(req, res)
);

// delete a passenger
passengersRouter.delete('/passengers/:id', passengersController.deleteOne);

// delete all passengers
passengersRouter.delete(
	'/passengers/delete/all',
	passengersController.deleteAll
);

module.exports = passengersRouter;

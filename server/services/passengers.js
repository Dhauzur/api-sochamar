const Passengers = require('../models/passengers');
const _ = require('underscore');

/**
 * create a new passengers and return the passengers
 */
const createOne = (req, res) => {
	let body = req.body;

	let documentsList = [];

	let passengers = new Passengers({
		firstName: body.firstName,
		lastName: body.lastName,
		age: body.age,
		birthdate: body.birthdate,
		state: body.state,
		appointment: body.appointment,
		function: body.function,
	});

	if (req.files.documents) {
		// create array the documents to save
		documentsList = req.files.documents.map(
			document => document.originalname
		);
		passengers.documents = documentsList;
	}

	if (req.files.passenger) {
		passengers.passenger = req.files.passenger[0].originalname;
	}

	passengers.save((err, passengersDB) => {
		if (err) {
			return res.status(400).json({
				status: false,
				err,
			});
		}
		res.json({
			status: true,
			passengers: passengersDB,
		});
	});
};

/**
 * edit a passengers
 */
const editOne = (req, res) => {
	let id = req.params.id;
	let documentsList = [];

	let body = _.pick(req.body, [
		'firstName',
		'lastName',
		'age',
		'birthdate',
		'state',
		'appointment',
		'function',
	]);

	// create array the documents to edit
	if (req.files.documents) {
		documentsList = req.files.documents.map(
			document => document.originalname
		);
		body.documents = documentsList;
	}
	if (req.files.passenger) {
		body.passenger = req.files.passenger[0].originalname;
	}

	Passengers.findByIdAndUpdate(
		id,
		body,
		{ new: true, runValidators: true },
		(err, passengersDB) => {
			if (err)
				return res.status(400).json({
					ok: false,
					err,
				});
			res.json({
				ok: true,
				passengers: passengersDB,
			});
		}
	);
};

/**
 * get all passengers and the count
 */
const getAll = res => {
	Passengers.find({}).exec((err, passengers) => {
		if (err)
			return res.status(400).json({
				status: false,
				err,
			});
		Passengers.count({}, (err, count) => {
			res.json({
				status: true,
				passengers,
				count,
			});
		});
	});
};

/**
 * delete a passenger
 */
const deleteOne = (req, res) => {
	let id = req.params.id;

	Passengers.findByIdAndRemove(id, (err, DeletedPassenger) => {
		if (err)
			return res.status(400).json({
				ok: false,
				err,
			});
		if (!DeletedPassenger)
			return res.status(400).json({
				status: false,
				err: {
					message: 'Passenger no encontrado',
				},
			});
		res.json({
			status: true,
		});
	});
};

/**
 * delete all passengers
 */
const deleteAll = res => {
	Passengers.deleteMany({}, function(err, passenger) {
		if (err) return res.status(400).json({ ok: false, err });
		res.json({
			deleteAll: true,
			deletedCount: passenger.deletedCount,
		});
	});
};

const passengersService = {
	createOne,
	getAll,
	editOne,
	deleteOne,
	deleteAll,
};

module.exports = Object.freeze(passengersService);

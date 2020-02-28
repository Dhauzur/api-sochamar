import Passengers from '../models/passengers';
import { pick } from 'underscore';

/**
 * create a new passengers and return the passengers
 */
const createOne = (userId, req, res) => {
	let body = req.body;

	let documentsList = [];
	//Esta parte se puede mejorar, con joi funcionando podriamos pasarle todo el req.body en new Passengers()
	//Deje un ejemplo en el services company función createOne
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
	passengers.users.push(userId);
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
const editOne = (userId, req, res) => {
	let id = req.params.id;
	let documentsList = [];

	let body = pick(req.body, [
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

	Passengers.findOneAndUpdate(
		{ _id: id, users: { $in: userId } },
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
const getAll = (userId, res) => {
	Passengers.find({ users: { $in: userId } }).exec((err, passengers) => {
		if (err)
			return res.status(400).json({
				status: false,
				err,
			});
		Passengers.countDocuments({}, (err, count) => {
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
const deleteOne = (userId, req, res) => {
	let id = req.params.id;

	Passengers.findOneAndRemove(
		{ _id: id, users: { $in: userId } },
		(err, DeletedPassenger) => {
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
		}
	);
};

/**
 * delete all passengers
 */
const deleteAll = (userId, res) => {
	Passengers.deleteMany({ users: { $in: userId } }, function(err, passenger) {
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

export default Object.freeze(passengersService);

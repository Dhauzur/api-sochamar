const Passengers = require('../models/passengers');
const path = require('path');

/**
 * create a new passengers and return the passengers
 */
const createOne = (req, res, createAt) => {
	let body = req.body;
	console.log(createAt);
	let passengers = new Passengers({
		passenger: `${req.files.passenger[0].fieldname}_${createAt}${
			path.parse(req.files.passenger[0].originalname).ext
		}`,
		pdf: `${req.files.pdf[0].fieldname}_${createAt}${
			path.parse(req.files.pdf[0].originalname).ext
		}`,
		firstName: body.firstName,
		lastName: body.lastName,
		age: body.age,
		birthdate: body.birthdate,
		state: body.state,
		appointment: body.appointment,
		function: body.function,
	});
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

const passengersService = {
	createOne,
	getAll,
};

module.exports = Object.freeze(passengersService);

const Passengers = require('../models/passengers');
const _ = require('underscore');
// const fs = require('fs');
// const path = require('path');

/**
 * create a new passengers and return the passengers
 */
const createOne = (req, res) => {
	let body = req.body;

	// create array pdf names to save
	const pdfList = req.files.pdf.map(pdf => pdf.originalname);
	console.log(req.body);
	let passengers = new Passengers({
		passenger: req.files.passenger[0].originalname,
		pdf: pdfList,
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
 * edit a passengers
 */
const editOne = (req, res) => {
	let id = req.params.id;

	// create array pdf names to edit
	const pdfList = req.files.pdf.map(pdf => pdf.originalname);

	let body = _.pick(req.body, [
		'firstName',
		'lastName',
		'age',
		'birthdate',
		'state',
		'appointment',
		'function',
	]);
	body.passenger = req.files.passenger[0].originalname;
	body.pdf = pdfList;

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

const passengersService = {
	createOne,
	getAll,
	editOne,
};

module.exports = Object.freeze(passengersService);

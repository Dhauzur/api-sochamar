import Passengers from '../models/passengers';
import { logError } from '../config/pino';

/**
 * create a new passengers and return the passengers
 */
const createOne = async (userId, req, res) => {
	try {
		let { body } = req;
		let passengers = new Passengers({
			firstName: body.firstName,
			lastName: body.lastName,
			age: body.age,
			birthdate: body.birthdate,
			state: body.state,
			appointment: body.appointment,
			function: body.function,
			phone: body.phone,
			region: body.region,
			comuna: body.comuna,
			documents: body.documents,
			passenger: body.passenger,
		});

		passengers.users.push(userId);
		const passengersDB = await passengers.save();
		res.json({
			status: true,
			passengers: passengersDB,
		});
	} catch (error) {
		logError(error.message);
		return res.status(400).json({
			status: false,
			error: error.message,
		});
	}
};

/**
 * edit a passengers
 */
const editOne = async (userId, req, res) => {
	try {
		let { id } = req.params;
		let { body } = req;
		const passengersDB = await Passengers.findByIdAndUpdate(
			{ _id: id, users: { $in: userId } },
			body,
			{ new: true, runValidators: true }
		);
		res.json({
			status: true,
			passengers: passengersDB,
		});
	} catch (error) {
		logError(error.message);
		return res.status(400).json({
			status: false,
			error: error.message,
		});
	}
};

/**
 * get all passengers and the count
 */
const getAll = async (userId, res) => {
	try {
		const passengers = await Passengers.find({ users: { $in: userId } });
		const count = await Passengers.countDocuments({});
		res.json({
			status: true,
			passengers,
			count,
		});
	} catch (error) {
		logError(error.message);
		return res.status(400).json({
			status: false,
			error: error.message,
		});
	}
};

/**
 * delete a passenger
 */
const deleteOne = async (userId, req, res) => {
	try {
		const { id } = req.params;
		await Passengers.findByIdAndRemove({ _id: id, users: { $in: userId } });
		res.json({
			status: true,
		});
	} catch (error) {
		logError(error.message);
		return res.status(400).json({
			status: false,
			error: error.message,
		});
	}
};

/**
 * delete all passengers
 */
const deleteAll = async (userId, res) => {
	try {
		await Passengers.deleteMany({ users: { $in: userId } });
		res.json({
			status: true,
		});
	} catch (error) {
		logError(error.message);
		return res.status(400).json({
			status: false,
			error: error.message,
		});
	}
};

const passengersService = {
	createOne,
	getAll,
	editOne,
	deleteOne,
	deleteAll,
};

export default Object.freeze(passengersService);

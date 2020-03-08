import Persons from '../models/person';
import { logError } from '../config/pino';

/**
 * create a new persons and return the persons
 */
const createOne = async (userId, req, res) => {
	try {
		let { body } = req;
		let persons = new Persons(body);
		persons.users.push(userId);
		const personsDB = await persons.save();
		res.json({
			status: true,
			persons: personsDB,
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
 * edit a persons
 */
const editOne = async (userId, req, res) => {
	try {
		let { id } = req.params;
		let { body } = req;
		const personsDB = await Persons.findByIdAndUpdate(
			{ _id: id, users: { $in: userId } },
			body,
			{ new: true, runValidators: true }
		);
		res.json({
			status: true,
			persons: personsDB,
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
 * get all persons and the count
 */
const getAll = async (userId, res) => {
	try {
		const persons = await Persons.find({ users: { $in: userId } });
		const count = await Persons.countDocuments({});
		res.json({
			status: true,
			persons,
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
 * delete a person
 */
const deleteOne = async (userId, req, res) => {
	try {
		const { id } = req.params;
		await Persons.findByIdAndRemove({ _id: id, users: { $in: userId } });
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
 * delete all persons
 */
const deleteAll = async (userId, res) => {
	try {
		await Persons.deleteMany({ users: { $in: userId } });
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

const personsService = {
	createOne,
	getAll,
	editOne,
	deleteOne,
	deleteAll,
};

export default Object.freeze(personsService);
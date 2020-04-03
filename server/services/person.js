import Persons from '../models/person';
import { logError } from '../config/pino';

/**
 * create a new persons and return the persons
 */
const createOne = async (userId, person, res) => {
	try {
		let persons = new Persons(person);
		persons.users.push(userId);
		const personsDB = await persons.save();
		res.json({
			status: true,
			person: personsDB,
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
const editOne = async (userId, person, personId, res) => {
	try {
		const personsDB = await Persons.findByIdAndUpdate(
			{ _id: personId, users: { $in: userId } },
			person,
			{ new: true, runValidators: true }
		);
		res.json({
			status: true,
			person: personsDB,
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
 * get one person
 */
const getOne = async (id, res) => {
	try {
		const person = await Persons.findById(id);

		res.json({
			status: true,
			person,
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
const deleteOne = async (userId, personId, res) => {
	try {
		await Persons.findByIdAndRemove({
			_id: personId,
			users: { $in: userId },
		});
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
	getOne,
	editOne,
	deleteOne,
	deleteAll,
};

export default Object.freeze(personsService);

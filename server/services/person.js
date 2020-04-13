import Persons from '../models/person';
import { logError, logInfo } from '../config/pino';
import { infoMessages } from '../utils/logger/infoMessages';

/**
 * create a new persons and return the persons
 */
const createOne = async (user, person, res) => {
	try {
		let persons = new Persons(person);
		persons.users.push(user._id);
		const personsDB = await persons.save();
		logInfo(infoMessages(user.email, 'registro', 'un', 'person'));
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
const editOne = async (user, person, personId, res) => {
	try {
		const personsDB = await Persons.findByIdAndUpdate(
			{ _id: personId, users: { $in: user._id } },
			person,
			{ new: true, runValidators: true }
		);
		logInfo(infoMessages(user.email, 'actualizo', 'un', 'person'));
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
const getAll = async (user, res) => {
	try {
		const persons = await Persons.find({ users: { $in: user._id } });
		const count = await Persons.countDocuments({});
		logInfo(infoMessages(user.email, 'obtuvo', 'todos los', 'person'));
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
const deleteOne = async (user, personId, res) => {
	try {
		await Persons.findByIdAndRemove({
			_id: personId,
			users: { $in: user._id },
		});
		logInfo(infoMessages(user.email, 'elimino', 'un', 'person'));
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
const deleteAll = async (user, res) => {
	try {
		await Persons.deleteMany({ users: { $in: user._id } });
		logInfo(infoMessages(user.email, 'elimino', 'todos los', 'person'));
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

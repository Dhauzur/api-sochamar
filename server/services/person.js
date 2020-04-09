import Persons from '../models/person';
import { logError } from '../config/pino';

/**
 * Create new persons
 * @param {Object} person
 * @param {Object} res
 * @returns {Object}
 */
const createOne = async (person, res) => {
	try {
		let persons = new Persons(person);
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
 * Edit a person by id
 * @param {Object} Person
 * @param {string} PersonId
 * @param {Object} res
 * @returns {Object}
 */
const editOne = async (person, personId, res) => {
	try {
		const personsDB = await Persons.findByIdAndUpdate(
			{ _id: personId },
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
 * Get all persons
 * @param {string} userId
 * @param {Object} res
 * @returns {Object}
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
 * get all persons attach a company
 * @param {string} idCompany
 * @param {Object} res
 * @returns {Object}
 */
const getPersonsCompany = async (idCompany, res) => {
	try {
		const persons = await Persons.find({
			idCompany: { $in: idCompany },
		});
		res.json({
			status: true,
			persons,
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
 * @param {string} id
 * @param {Object} res
 * @returns {Object} person
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
 * Patch persons by email if exist
 * @param {string} email
 * @param {Object} res
 * @returns {Object}
 */
const patchRequest = async (data, res) => {
	try {
		// check if the email exists
		const person = await Persons.findOne({
			email: { $in: data.email },
		});

		if (!person) {
			return res.status(400).send(`Este usuario usuario no se encuentra
			en nuestra base de datos, 
			puede agregarlo
			 manualmente o perdirle que se registre como persona`);
		}
		if (person.request.includes(data.newRequest.toLowerCase())) {
			logError('Ya ha enviadp la solicitud');
			return res
				.status(400)
				.send(`Ya haz enviado una solicitud a este usuario`);
		}
		person.request.push(data.newRequest.toLowerCase());
		await person.save();
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
 * Delete person by id
 * @param {string} userId
 * @param {string} personId
 * @param {Object} res
 * @returns {Object}
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
 * Delete all persons
 * @param {string} userId
 * @returns {Object}
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
	getPersonsCompany,
	getOne,
	patchRequest,
	editOne,
	deleteOne,
	deleteAll,
};

export default Object.freeze(personsService);

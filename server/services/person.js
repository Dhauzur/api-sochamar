import Persons from '../models/person';
import { logError, logInfo } from '../config/pino';
import { findIndex } from 'underscore';
import { actionInfo, infoMessages } from '../utils/logger/infoMessages';
import ejs from 'ejs';
import { createPdfWithStreamAndSendResponse } from '../utils/pdf/createToStream';
import { errorResponse } from '../utils/responses/errorResponse';
/**
 * Create new persons
 * @param user
 * @param {Object} person
 * @param {Object} res
 * @returns {Object}
 */
const createOne = async (user, person, res) => {
	try {
		let persons = new Persons(person);
		const personsDB = await persons.save();
		logInfo(
			infoMessages(user.email, 'registro', 'un', 'person', personsDB)
		);
		res.json({
			status: true,
			person: personsDB,
		});
	} catch (error) {
		logError(error);
		return res.status(400).json({
			status: false,
			error: error.message,
		});
	}
};

/**
 * Edit a person by id
 * @param user
 * @param person
 * @param personId
 * @param {Object} res
 * @returns {Object}
 */
const editOne = async (user, person, personId, res) => {
	try {
		const personsDB = await Persons.findByIdAndUpdate(
			{ _id: personId },
			person,
			{ new: true, runValidators: true }
		);
		logInfo(
			infoMessages(user.email, 'actualizo', 'un', 'person', personsDB)
		);
		res.json({
			status: true,
			person: personsDB,
		});
	} catch (error) {
		logError(error);
		return res.status(400).json({
			status: false,
			error: error.message,
		});
	}
};

/**
 * Get all persons
 * @param user
 * @param {Object} res
 * @returns {Object}
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
		logError(error);
		return res.status(400).json({
			status: false,
			error: error.message,
		});
	}
};

/**
 * get all persons attach a company
 * @param user
 * @param {string} idCompany
 * @param {Object} res
 * @returns {Object}
 */
const getPersonsCompany = async (user, idCompany, res) => {
	try {
		const persons = await Persons.find({
			idCompany: { $in: idCompany },
		});
		logInfo(
			infoMessages(
				user.email,
				'obtuvo',
				'un',
				'person',
				undefined,
				'con companyId'
			)
		);
		res.json({
			status: true,
			persons,
		});
	} catch (error) {
		logError(error);
		return res.status(400).json({
			status: false,
			error: error.message,
		});
	}
};

/**
 * get one person
 * @param user
 * @param {string} id
 * @param {Object} res
 * @returns {Object} person
 */
const getOne = async (user, id, res) => {
	try {
		const person = await Persons.findById(id);
		logInfo(infoMessages(user.email, 'obtuvo', 'un', 'person'));
		res.json({
			status: true,
			person,
		});
	} catch (error) {
		logError(error);
		return res.status(400).json({
			status: false,
			error: error.message,
		});
	}
};

/**
 * Patch persons by email if exist
 * @param user
 * @param data
 * @param {Object} res
 * @returns {Object}
 */
const patchRequest = async (user, data, res) => {
	try {
		// check if the email exists
		const person = await Persons.findOne({
			email: { $in: data.email },
		});

		/**
		 * Return error when persons no exist in the db
		 */
		if (!person) {
			return res.status(400).send(`Este usuario no existe`);
		}
		/**
		 * Return error when try duplicate the request
		 */
		const isDuplicated = person.request.some(
			request => request.idCompany === data.newRequest
		);
		if (isDuplicated && !data.cancel) {
			return res
				.status(400)
				.send(`Ya haz enviado una solicitud a este usuario`);
		}
		if (data.cancel) {
			/**
			 * Calcel a request, return status 200
			 */
			logInfo(
				actionInfo(person.email, 'declino su solicitud de company')
			);
			person.request.splice(
				findIndex(person.request, { idCompany: data.newRequest }),
				1
			);
		} else {
			/**
			 * update person, push new request.
			 */
			logInfo(actionInfo(person.email, 'acepto su solicitud de company'));
			person.request.push({
				idCompany: data.newRequest,
				name: data.companyName,
			});
		}
		await person.save();
		return res.json({
			status: true,
			person,
		});
	} catch (error) {
		logError(error);
		return res.status(400).json({
			status: false,
			error: error.message,
		});
	}
};

/**
 * Delete person by id
 * @param user
 * @param {string} userId
 * @param {string} personId
 * @param {Object} res
 * @returns {Object}
 */
const deleteOne = async (user, personId, res) => {
	try {
		const deletedPerson = await Persons.findByIdAndRemove({
			_id: personId,
			users: { $in: user._id },
		});
		logInfo(
			infoMessages(
				user.email,
				'elimino',
				'un',
				'person',
				deletedPerson,
				'con personId'
			)
		);
		res.json({
			status: true,
		});
	} catch (error) {
		logError(error);
		return res.status(400).json({
			status: false,
			error: error.message,
		});
	}
};

/**
 * Delete all persons
 * @returns {Object}
 * @param user
 * @param res
 */
const deleteAll = async (user, res) => {
	try {
		await Persons.deleteMany({ users: { $in: user._id } });
		logInfo(infoMessages(user.email, 'elimino', 'todos los', 'person'));
		res.json({
			status: true,
		});
	} catch (error) {
		logError(error);
		return res.status(400).json({
			status: false,
			error: error.message,
		});
	}
};

const generatePdfReport = async res => {
	const foundPersons = await Persons.find();
	ejs.renderFile(
		'./server/templates/person-template.ejs',
		{ persons: foundPersons },
		(err, data) => {
			if (err) {
				logError(err.message);
				errorResponse(err, res);
			} else {
				createPdfWithStreamAndSendResponse(data, res);
			}
		}
	);
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
	generatePdfReport,
};

export default Object.freeze(personsService);

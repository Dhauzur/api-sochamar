import Persons from '../models/person';
import { logError, logInfo } from '../config/pino';
import { findIndex } from 'underscore';
import { actionInfo, infoMessages } from '../utils/logger/infoMessages';
import ejs from 'ejs';
import { createPdfWithStreamAndSendResponse } from '../utils/pdf/createToStream';
import { errorCallback } from '../utils/functions/errorCallback';
const csv = require('fast-csv');

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
		logError(error.message);
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
		logError(error.message);
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
		logError(error.message);
		return res.status(400).json({
			status: false,
			error: error.message,
		});
	}
};

const findAllWithCompanyId = async companyId => {
	return await Persons.find({
		idCompany: { $in: companyId },
	});
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
		const persons = await findAllWithCompanyId(idCompany);
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
		logError(error.message);
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
		logError(error.message);
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
		} else if (data.unsubscribe) {
			/**
			 * unsubscribe person to company "admin".
			 */
			logInfo(actionInfo(person.email, 'Salió de su equipo'));
			person.idCompany = '';
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
		logError(error.message);
		return res.status(400).json({
			status: false,
			error: error.message,
		});
	}
};

/**
 * Patch conversation
 * @param {Object} data
 * @param {Object} res
 * @returns {Object}
 */
const patchConversation = async (data, res) => {
	try {
		const person = await Persons.findById(data.id);
		person.conversation.length
			? person.conversation.push(data.conversation)
			: (person.conversation = data.conversation);
		await person.save();
		return res.json({ status: true, person });
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
		logError(error.message);
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
		logError(error.message);
		return res.status(400).json({
			status: false,
			error: error.message,
		});
	}
};

const generatePdfReport = async (user, companyId, res) => {
	try {
		const foundPersons = await findAllWithCompanyId(user._id);
		ejs.renderFile(
			'./server/templates/person-template.ejs',
			{ persons: foundPersons },
			(err, data) => {
				if (err) {
					errorCallback(err, res);
				} else {
					logInfo(
						actionInfo(user.email, 'exporto un pdf de personas')
					);
					createPdfWithStreamAndSendResponse(data, res);
				}
			}
		);
	} catch (e) {
		errorCallback(e, res);
	}
};

const generateCsvReport = async (user, companyId, res) => {
	try {
		const foundPersons = await findAllWithCompanyId(user._id);
		const formattedPersons = foundPersons.map(person => {
			return {
				firstName: person.firstName,
				lastName: person.lastName,
				rut: person.rut,
				age: person.age,
				state: person.state,
				region: person.region,
				comuna: person.comuna,
				phone: person.phone,
				email: person.email,
			};
		});
		res.writeHead(200, {
			'Content-Type': 'text/csv',
			'Content-Disposition': 'attachment; filename=personas.csv',
		});
		logInfo(actionInfo(user.email, 'exporto un csv de personas'));
		csv.write(formattedPersons, {
			headers: true,
			transform: function(row) {
				return {
					'Nombre Completo': `${row.firstName} ${
						row.lastName ? row.lastName : ''
					}`,
					Rut: row.rut || '-',
					'Fecha de Nacimiento': row.birthdate || '-',
					Edad: row.age || '-',
					Estado: row.state || '-',
					Region: row.region || '-',
					Comuna: row.comuna || '-',
					Telefono: row.phone || '-',
					Email: row.email || '-',
				};
			},
		}).pipe(res);
	} catch (e) {
		errorCallback(e, res);
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
	generatePdfReport,
	generateCsvReport,
	patchConversation,
};

export default Object.freeze(personsService);

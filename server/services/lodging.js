import Lodging from '../models/lodging';
import moment from 'moment';
import { logInfo } from '../config/pino';
import { infoMessages } from '../utils/logger/infoMessages';
import placeServices from '../services/place';
import ejs from 'ejs';
import { createPdfWithStreamAndSendResponse } from '../utils/pdf/createToStream';
import { errorCallback } from '../utils/functions/errorCallback';
import { errorResponse } from '../utils/responses/errorResponse';
const csv = require('fast-csv');

const mountTotal = days => {
	let totalAmount = 0;
	//services cost and quantity are saved in lodging.days property
	const getDayTotal = services => {
		let iterationPrice = 0;
		services.forEach(service => {
			let serviceTotal = service.price * service.quantity;
			iterationPrice = iterationPrice + serviceTotal;
		});
		return iterationPrice;
	};
	//for every day a dayTotal must be created then it sum with totalAmount
	days.forEach(day => {
		const dayTotal = getDayTotal(day.services);
		totalAmount = totalAmount + dayTotal;
	});

	return totalAmount;
};

const lodgingsTotal = lodgings => {
	let totalAmount = 0;
	lodgings.forEach(lodging => {
		totalAmount += lodging.mountTotal;
	});
	return totalAmount;
};

const getAll = async (user, res) => {
	try {
		const lodgings = await Lodging.find({});
		const length = await Lodging.countDocuments({});
		logInfo(infoMessages(user.email, 'obtuvo', 'todos los', 'lodging'));
		res.json({
			status: true,
			lodgings,
			length,
		});
	} catch (e) {
		errorCallback(e, res);
	}
};

/**
 * search all lodgings for idPlace
 */
const getAllForPlace = async (user, req, res) => {
	try {
		const lodgings = await Lodging.find({
			place: req.params.id,
		});
		const count = await Lodging.countDocuments({ place: req.params.id });
		logInfo(
			infoMessages(
				user.email,
				'obtuvo',
				'todos los',
				'lodging',
				undefined,
				'con placeId'
			)
		);
		res.json({
			status: true,
			count,
			lodgings,
		});
	} catch (error) {
		return res.status(400).send({
			status: false,
			error: error.message,
		});
	}
};

const createOne = async (user, lodging, res) => {
	try {
		const lodgingDB = await Lodging.findOneAndUpdate(
			{ id: lodging.id },
			{
				group: lodging.group,
				start: moment(lodging.start)
					.hours(16)
					.format('YYYY-MM-DD'),
				end: moment(lodging.end)
					.hours(12)
					.format('YYYY-MM-DD'),
				days: lodging.days,
				place: lodging.place,
				persons: lodging.persons,
				content: lodging.content,
				mountTotal: mountTotal(lodging.days),
			},
			{ upsert: true }
		);
		logInfo(
			infoMessages(user.email, 'registro', 'un', 'lodging', lodgingDB)
		);
		res.json({
			status: true,
			lodging: lodgingDB,
		});
	} catch (e) {
		errorCallback(e, res);
	}
};

const deleteAll = async (user, res) => {
	try {
		await Lodging.deleteMany({});
		logInfo(infoMessages(user.email, 'elimino', 'todos los', 'lodging'));
		res.json({ status: true });
	} catch (e) {
		errorCallback(e, res);
	}
};

const deleteAllWithPlace = async (user, req, res) => {
	try {
		const { place } = req.params;
		await Lodging.deleteMany({ place });
		logInfo(
			infoMessages(
				user.email,
				'elimino',
				'todos los',
				'lodging',
				undefined,
				'con placeId'
			)
		);
		res.json({ status: true });
	} catch (e) {
		errorCallback(e, res);
	}
};

const deleteOneWithPlaceId = async (user, req, res) => {
	try {
		const { id } = req.params;
		const deletedLodging = await Lodging.deleteMany({ id });
		logInfo(
			infoMessages(
				user.email,
				'elimino',
				'un',
				'lodging',
				deletedLodging,
				'con placeId'
			)
		);
		res.json({ status: true });
	} catch (e) {
		errorCallback(e, res);
	}
};

const generatePdfReport = async (user, placeId, res) => {
	if (placeId === 'null') {
		try {
			//if null is the value, getting all user places is needed then
			const userPlaces = await placeServices.getPlacesIds(user._id);
			//we need populate to get place names without calling mongoose again or a place model function
			const foundLodgings = await Lodging.find({
				place: { $in: userPlaces },
			}).populate('place');
			//allPlaces pdf needs to order the data based on one place and his lodgings, to do this first we filter the unique places with set
			// ... allow us to make an array object instead of a array of set
			const uniquePlaces = [...new Set(foundLodgings.map(l => l.place))];
			//based in one place, we return a new object { placeName:'minera 1', lodgings: ['minera 1 lodgings only']}
			const organizedLodgings = uniquePlaces.map(place => {
				return {
					placeName: place.name,
					lodgings: foundLodgings.filter(
						l => l.place._id === place._id
					),
					lodgingTotalAmount: lodgingsTotal(foundLodgings),
				};
			});
			ejs.renderFile(
				'./server/templates/lodging-allPlaces-template.ejs',
				{ lodgings: organizedLodgings },
				(err, data) => {
					if (err) {
						errorCallback(err, res);
					} else {
						createPdfWithStreamAndSendResponse(data, res);
					}
				}
			);
		} catch (e) {
			errorCallback(e, res);
		}
	} else {
		try {
			const foundLodgings = await Lodging.find({ place: placeId });
			//searching place by id to get his name
			const place = await placeServices.searchOneWithId(placeId);
			const lodgingsTotalAmount = lodgingsTotal(foundLodgings);
			ejs.renderFile(
				'./server/templates/lodging-singlePlace-template.ejs',
				{
					lodgings: foundLodgings,
					placeName: place.name,
					lodgingsTotalAmount: lodgingsTotalAmount,
				},
				(err, data) => {
					if (err) {
						errorCallback(err, res);
					} else {
						createPdfWithStreamAndSendResponse(data, res);
					}
				}
			);
		} catch (e) {
			errorCallback(e, res);
		}
	}
};

const generateCsvReport = async (user, placeId, res) => {
	if (placeId === 'null') {
		try {
			//if null is the value, getting all user places is needed then
			const userPlaces = await placeServices.getPlacesIds(user._id);
			//we need populate to get place names without calling mongoose again or a place model function
			const foundLodgings = await Lodging.find({
				place: { $in: userPlaces },
			}).populate('place');
			const formattedLodgings = foundLodgings.map(lodging => {
				return {
					placeName: lodging.place.name,
					startDate: lodging.start,
					endDate: lodging.end,
					mountTotal: lodging.mountTotal,
				};
			});
			res.writeHead(200, {
				'Content-Type': 'text/csv',
				'Content-Disposition': 'attachment; filename=hospedajes.csv',
			});
			csv.write(formattedLodgings, {
				headers: true,
				transform: function(row) {
					return {
						Lugar: row.rut,
						'Fecha inicio': row.birthdate,
						'Fecha fin': row.age,
						'Monto total': row.state,
					};
				},
			}).pipe(res);
		} catch (e) {
			errorResponse(e, res);
		}
	} else {
		try {
			const foundLodgings = await Lodging.find({ place: placeId });
			//searching place by id to get his name
			const place = await placeServices.searchOneWithId(placeId);
			const formattedLodgings = foundLodgings.map(lodging => {
				return {
					placeName: place.name,
					startDate: lodging.start,
					endDate: lodging.end,
					mountTotal: lodging.mountTotal,
				};
			});

			res.writeHead(200, {
				'Content-Type': 'text/csv',
				'Content-Disposition': 'attachment; filename=hospedajes.csv',
			});
			csv.write(formattedLodgings, {
				headers: true,
				transform: function(row) {
					return {
						Lugar: row.placeName,
						'Fecha inicio': row.birthdate,
						'Fecha fin': row.age,
						'Monto total': row.state,
					};
				},
			}).pipe(res);
		} catch (e) {
			errorCallback(e, res);
		}
	}
};

const lodgingService = {
	getAll,
	createOne,
	deleteAll,
	getAllForPlace,
	deleteAllWithPlace,
	deleteOneWithPlaceId,
	generatePdfReport,
	generateCsvReport,
};

export default Object.freeze(lodgingService);

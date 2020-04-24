import Lodging from '../models/lodging';
import { logInfo } from '../config/pino';
import { actionInfo, infoMessages } from '../utils/logger/infoMessages';
import placeServices from '../services/place';
import ejs from 'ejs';
import { createPdfWithStreamAndSendResponse } from '../utils/pdf/createToStream';
import { errorCallback } from '../utils/functions/errorCallback';

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
		const newLodging = new Lodging(lodging);
		const newLodgingDB = await newLodging.save();
		logInfo(
			infoMessages(user.email, 'registro', 'un', 'lodging', newLodgingDB)
		);
		res.json({
			status: true,
			lodging: newLodgingDB,
		});
	} catch (e) {
		errorCallback(e, res);
	}
};

const updateOne = async (user, id, data, res) => {
	try {
		const lodging = await Lodging.findByIdAndUpdate(id, data);
		logInfo(
			infoMessages(user.email, 'actualizo', 'un', 'lodging', lodging)
		);
		res.json({ status: true, lodging });
	} catch (err) {
		errorCallback(err, res);
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
						logInfo(
							actionInfo(
								user.email,
								'exporto un pdf de hospedajes en base a todos sus lugares'
							)
						);
						createPdfWithStreamAndSendResponse(data, res);
					}
				}
			);
		} catch (e) {
			errorCallback(e, res);
		}
	} else {
		try {
			const foundLodgings = await Lodging.find({
				place: placeId,
			});
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
						logInfo(
							actionInfo(
								user.email,
								`exporto un pdf de hospedajes del lugar: ${place.name}`
							)
						);
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
					lodgingTotal: '',
					lodgingTotalWithIva: '',
				};
			});
			const lodgingsTotalAmount = lodgingsTotal(foundLodgings);
			const totalWithIva = lodgingsTotalAmount * 1.19;
			formattedLodgings.push({
				lodgingTotal: lodgingsTotalAmount,
				lodgingTotalWithIva: Math.trunc(totalWithIva),
			});
			res.writeHead(200, {
				'Content-Type': 'text/csv',
				'Content-Disposition': 'attachment; filename=hospedajes.csv',
			});
			logInfo(
				actionInfo(
					user.email,
					'exporto un csv de hospedajes en base a todos sus lugares'
				)
			);
			csv.write(formattedLodgings, {
				headers: true,
				transform: function(row) {
					return {
						Lugar: row.placeName || '-',
						'Fecha inicio': row.startDate || '-',
						'Fecha fin': row.endDate || '-',
						'Monto total': row.mountTotal || '-',
						'Total hospedaje': row.lodgingTotal || '-',
						'Total hospedaje con iva':
							row.lodgingTotalWithIva || '-',
					};
				},
			}).pipe(res);
		} catch (e) {
			errorCallback(e, res);
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
					lodgingTotal: '',
					lodgingTotalWithIva: '',
				};
			});
			const lodgingsTotalAmount = lodgingsTotal(foundLodgings);
			const totalWithIva = lodgingsTotalAmount * 1.19;
			formattedLodgings.push({
				lodgingTotal: lodgingsTotalAmount,
				lodgingTotalWithIva: Math.trunc(totalWithIva),
			});
			res.writeHead(200, {
				'Content-Type': 'text/csv',
				'Content-Disposition': 'attachment; filename=hospedajes.csv',
			});
			logInfo(
				actionInfo(
					user.email,
					`exporto un csv de hospedajes del lugar: ${place.name}`
				)
			);
			csv.write(formattedLodgings, {
				headers: true,
				transform: function(row) {
					return {
						Lugar: row.placeName || '-',
						'Fecha inicio': row.startDate || '-',
						'Fecha fin': row.endDate || '-',
						'Monto total': row.mountTotal || '-',
						'Total hospedaje': row.lodgingTotal || '-',
						'Total hospedaje con iva':
							row.lodgingTotalWithIva || '-',
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
	updateOne,
	deleteAll,
	getAllForPlace,
	deleteAllWithPlace,
	deleteOneWithPlaceId,
	generatePdfReport,
	generateCsvReport,
};

export default Object.freeze(lodgingService);

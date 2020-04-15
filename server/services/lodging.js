import Lodging from '../models/lodging';
import moment from 'moment';
import { logError, logInfo } from '../config/pino';
import { infoMessages } from '../utils/logger/infoMessages';

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
	} catch (error) {
		logError(error.message);
		res.status(400).json({ status: false, error: error.message });
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
	} catch (error) {
		logError(error.message);
		res.status(400).json({ status: false, error: error.message });
	}
};

const deleteAll = async (user, res) => {
	try {
		await Lodging.deleteMany({});
		logInfo(infoMessages(user.email, 'elimino', 'todos los', 'lodging'));
		res.json({ status: true });
	} catch (error) {
		logError(error.message);
		res.status(400).json({ status: false, error: error.message });
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
	} catch (error) {
		logError(error.message);
		res.status(400).json({ status: false, error: error.message });
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
	} catch (error) {
		logError(error.message);
		res.status(400).json({ status: false, error: error.message });
	}
};

const lodgingService = {
	getAll,
	createOne,
	deleteAll,
	getAllForPlace,
	deleteAllWithPlace,
	deleteOneWithPlaceId,
};

export default Object.freeze(lodgingService);

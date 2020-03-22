import Lodging from '../models/lodging';
import Place from '../models/place';
import moment from 'moment';
import { logError } from '../config/pino';

const mountTotal = async (service, place) => {
	// set mount total
	let breakfast = 0,
		lunch = 0,
		dinner = 0,
		lodging = 0;
	let parsedService = JSON.parse(service);
	const responseDB = await Place.find({ _id: place });
	const prices = responseDB[0].prices;
	parsedService.map(arr => {
		arr.filter((item, index) => {
			if (index === 0) breakfast = breakfast + item;
			if (index === 1) lunch = lunch + item;
			if (index === 2) dinner = dinner + item;
			if (index === 3) lodging = lodging + item;
		});
	});
	const mountTotal =
		lodging * prices[3] +
		dinner * prices[2] +
		lunch * prices[1] +
		breakfast * prices[0];

	return mountTotal;
};

const getAll = async res => {
	try {
		const lodgings = await Lodging.find({});
		const length = await Lodging.countDocuments({});
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
const getAllForPlace = async (req, res) => {
	try {
		const lodgings = await Lodging.find({
			place: req.params.id,
		});
		const count = await Lodging.countDocuments({ place: req.params.id });
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

const createOne = async (lodging, res) => {
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
				service: lodging.service,
				place: lodging.place,
				persons: lodging.persons,
				content: lodging.content,
				mountTotal: await mountTotal(lodging.service, lodging.place),
			},
			{ upsert: true }
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

const deleteAll = async res => {
	try {
		await Lodging.deleteMany({});
		res.json({ status: true });
	} catch (error) {
		logError(error.message);
		res.status(400).json({ status: false, error: error.message });
	}
};

const deleteAllWithPlace = async (req, res) => {
	try {
		const { place } = req.params;
		await Lodging.deleteMany({ place });
		res.json({ status: true });
	} catch (error) {
		logError(error.message);
		res.status(400).json({ status: false, error: error.message });
	}
};

const deleteOneWithPlaceId = async (req, res) => {
	try {
		const { id } = req.params;
		await Lodging.deleteMany({ id });
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

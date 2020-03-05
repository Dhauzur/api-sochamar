import Lodging from '../models/lodging';
import Place from '../models/place';
import moment from 'moment';
import { logError } from '../config/pino';

const mountTotal = async body => {
	// set mount total
	let breakfast = 0,
		lunch = 0,
		dinner = 0,
		lodging = 0;
	let service = JSON.parse(body.service);
	const responseDB = await Place.find({ _id: body.place });
	const prices = responseDB[0].prices;
	service.map(arr => {
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

const createOne = async (req, res) => {
	try {
		const { body } = req;
		const lodgingDB = await Lodging.findOneAndUpdate(
			{ id: body.id },
			{
				group: body.group,
				start: moment(body.start)
					.hours(16)
					.format('YYYY-MM-DD'),
				end: moment(body.end)
					.hours(12)
					.format('YYYY-MM-DD'),
				service: body.service,
				place: body.place,
				passengers: body.passengers,
				mountTotal: await mountTotal(body),
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
		Lodging.deleteMany({ id });
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

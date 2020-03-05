import Periods from '../models/period';
import placeService from './place';
import { logError } from '../config/pino';

const getAll = async (userId, placeId, res) => {
	try {
		/*Si no existe id del lugar, significa que el frontend esta usando 'Todos los lugares'*/
		if (placeId === 'null') {
			const places = await placeService.getPlacesIds(userId);
			const periods = await Periods.find({ place: { $in: places } });
			res.json({
				status: true,
				periods,
			});
		} else {
			const periods = await Periods.find({ place: placeId });
			res.json({
				status: true,
				periods,
			});
		}
	} catch (error) {
		logError(error.message);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const createOne = async (placeId, period, res) => {
	try {
		let periods = new Periods(period);
		periods.place = placeId;
		const periodsDB = await periods.save();
		res.json({
			status: true,
			periods: periodsDB,
		});
	} catch (error) {
		logError(error.message);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const deleteOne = async (placeId, periodId, res) => {
	try {
		await Periods.findOneAndDelete(
			{ _id: periodId, place: placeId },
			{ projection: 'name' }
		);
		res.json({ status: true });
	} catch (error) {
		logError(error.message);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const deleteAll = async (placeId, res) => {
	try {
		await Periods.deleteMany({ place: placeId });
		res.json({
			deleteAll: true,
		});
	} catch (error) {
		logError(error.message);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const periodService = {
	getAll,
	createOne,
	deleteOne,
	deleteAll,
};

export default Object.freeze(periodService);

import Periods from '../models/period';
import placeService from './place';
import { logError, logInfo } from '../config/pino';
import { infoMessages } from '../utils/logger/infoMessages';

const getAll = async (user, placeId, res) => {
	try {
		/*Si no existe id del lugar, significa que el frontend esta usando 'Todos los lugares'*/
		if (placeId === 'null') {
			const userPlaces = await placeService.getPlacesIds(user._id);
			const periods = async userPlaces =>
				await Periods.find({ place: { $in: userPlaces } });
			const allPeriodsUser = await periods(userPlaces);
			logInfo(
				infoMessages(
					user.email,
					'obtuvo',
					'todos los',
					'period',
					`de ${user.email}`
				)
			);
			res.json({
				status: true,
				periods: allPeriodsUser,
			});
		} else {
			const periods = await Periods.find({ place: placeId });
			logInfo(
				infoMessages(
					user.email,
					'obtuvo',
					'todos los',
					'period',
					'con placeId'
				)
			);
			res.json({
				status: true,
				periods,
			});
		}
	} catch (error) {
		logError(error);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const createOne = async (user, placeId, period, res) => {
	try {
		let periods = new Periods(period);
		periods.place = placeId;
		const periodsDB = await periods.save();
		logInfo(
			infoMessages(user.email, 'registro', 'un', 'period', periodsDB)
		);
		res.json({
			status: true,
			periods: periodsDB,
		});
	} catch (error) {
		logError(error);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const deleteOne = async (user, placeId, periodId, res) => {
	try {
		const deletedPeriod = await Periods.findOneAndDelete(
			{ _id: periodId, place: placeId },
			{ projection: 'name' }
		);
		logInfo(
			infoMessages(
				user.email,
				'elimino',
				'un',
				'periodpayment',
				deletedPeriod
			)
		);
		res.json({ status: true });
	} catch (error) {
		logError(error);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const deleteAll = async (user, placeId, res) => {
	try {
		await Periods.deleteMany({ place: placeId });
		logInfo(infoMessages(user.email, 'elimino', 'todos los', 'period'));
		res.json({
			deleteAll: true,
		});
	} catch (error) {
		logError(error);
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

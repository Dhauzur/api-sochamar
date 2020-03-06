import Activities from '../models/activities';
import { logError } from '../config/pino';

const getAll = async res => {
	try {
		const activities = await Activities.find(null);
		const length = await Activities.countDocuments(null);
		res.json({
			status: true,
			activities: activities.reverse(),
			length,
		});
	} catch (error) {
		logError(error.message);
		return res.status(400).send({
			status: false,
			error: error.message,
		});
	}
};

const createOne = async (activity, res) => {
	try {
		let activities = new Activities({
			workPlace: activity.workPlace,
			whatWasDone: activity.whatWasDone,
			ncamas: activity.ncamas,
			date: activity.date,
		});
		const activitiesDB = await activities.save();
		res.json({
			status: true,
			activities: activitiesDB,
		});
	} catch (error) {
		logError(error.message);
		return res.status(400).send({
			status: false,
			error: error.message,
		});
	}
};

const deleteAll = async res => {
	try {
		await Activities.deleteMany({});
		res.json({
			status: true,
		});
	} catch (error) {
		logError(error.message);
		return res.status(400).send({
			status: false,
			error: error.message,
		});
	}
};

const activitiesService = {
	getAll,
	createOne,
	deleteAll,
};

export default Object.freeze(activitiesService);

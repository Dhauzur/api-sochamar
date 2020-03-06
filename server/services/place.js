import Place from '../models/place';
import Lodging from '../models/lodging';
import { logError } from '../config/pino';

const getOne = async (userId, placeId, res) => {
	try {
		const place = await Place.findOne({
			_id: placeId,
			users: { $in: userId },
		});
		res.json({
			status: true,
			place,
		});
	} catch (error) {
		logError(error.message);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const getAll = async (userId, res) => {
	try {
		const place = await Place.find({ users: { $in: userId } });
		const length = await Place.countDocuments({});
		res.json({
			status: true,
			place,
			length,
		});
	} catch (error) {
		logError(error.message);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const createOne = async (userId, place, res) => {
	try {
		const newPlace = new Place(place);
		newPlace.users.push(userId);
		const placeDB = await newPlace.save();
		res.json({
			status: true,
			place: placeDB,
		});
	} catch (error) {
		logError(error.message);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const deleteOne = async (userId, placeId, res) => {
	try {
		const place = await Place.findOne({
			_id: placeId,
			users: { $in: userId },
		});
		await Place.deleteOne({ _id: placeId });
		const lodging = await Lodging.deleteMany({ place: placeId });
		res.json({
			delete: place.name,
			lodgins: lodging.deletedCount,
		});
	} catch (error) {
		logError(error.message);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const deleteAll = async (userId, res) => {
	try {
		Place.deleteMany({ users: { $in: userId } });
		res.json({
			status: true,
		});
	} catch (error) {
		logError(error.message);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const getPlacesIds = async userId => {
	try {
		const place = await Place.find({ users: { $in: userId } });
		return place.map(place => place._id);
	} catch (error) {
		logError(error.message);
	}
};

const placeService = {
	getOne,
	getAll,
	createOne,
	deleteOne,
	deleteAll,
	getPlacesIds,
};

export default Object.freeze(placeService);

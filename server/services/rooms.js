import Rooms from '../models/rooms';
import placeService from './place';
import { logError } from '../config/pino';

const getAll = async (userId, placeId, res) => {
	try {
		/*Si no existe id del lugar, significa que el frontend esta usando 'Todos los lugares'*/
		if (placeId === 'null') {
			const places = await placeService.getPlacesIds(userId);
			const rooms = await Rooms.find({ place: { $in: places } });
			res.json({
				status: true,
				rooms,
			});
		} else {
			const rooms = await Rooms.find({ place: placeId });
			res.json({
				status: true,
				rooms,
			});
		}
	} catch (error) {
		logError(error.message);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const createOne = async (placeId, room, res) => {
	try {
		let rooms = new Rooms(room);
		rooms.place = placeId;
		const roomsDB = await rooms.save();
		res.json({
			status: true,
			rooms: roomsDB,
		});
	} catch (error) {
		logError(error.message);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const deleteOne = async (placeId, roomId, res) => {
	try {
		await Rooms.findOneAndDelete(
			{ _id: roomId, place: placeId },
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
		await Rooms.deleteMany({ place: placeId });
		res.json({
			deleteAll: true,
		});
	} catch (error) {
		logError(error.message);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const roomsService = {
	getAll,
	createOne,
	deleteOne,
	deleteAll,
};

export default Object.freeze(roomsService);

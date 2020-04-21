import Rooms from '../models/rooms';
import placeService from './place';
import { logError, logInfo } from '../config/pino';
import { infoMessages } from '../utils/logger/infoMessages';

const getAll = async (user, placeId, res) => {
	try {
		/*Si no existe id del lugar, significa que el frontend esta usando 'Todos los lugares'*/
		if (placeId === 'null') {
			const userPlaces = await placeService.getPlacesIds(user._id);
			const rooms = async userPlaces =>
				await Rooms.find({ place: { $in: userPlaces } });
			const allRoomsUser = await rooms(userPlaces);
			logInfo(
				infoMessages(
					user.email,
					'obtuvo',
					'todos',
					'rooms',
					`de ${user.email}`
				)
			);
			res.json({
				status: true,
				rooms: allRoomsUser,
			});
		} else {
			const rooms = await Rooms.find({ place: placeId });
			logInfo(
				infoMessages(
					user.email,
					'obtuvo',
					'todos',
					'rooms',
					'con placeId'
				)
			);
			res.json({
				status: true,
				rooms,
			});
		}
	} catch (error) {
		logError(error);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const createOne = async (user, placeId, room, res) => {
	try {
		let rooms = new Rooms(room);
		rooms.place = placeId;
		const roomsDB = await rooms.save();
		logInfo(infoMessages(user.email, 'registro', 'un', 'rooms', roomsDB));
		res.json({
			status: true,
			rooms: roomsDB,
		});
	} catch (error) {
		logError(error);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const deleteOne = async (user, placeId, roomId, res) => {
	try {
		const deletedRoom = await Rooms.findOneAndDelete(
			{ _id: roomId, place: placeId },
			{ projection: 'name' }
		);
		logInfo(
			infoMessages(user.email, 'elimino', 'un', 'rooms', deletedRoom)
		);
		res.json({ status: true });
	} catch (error) {
		logError(error);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const deleteAll = async (user, placeId, res) => {
	try {
		await Rooms.deleteMany({ place: placeId });
		logInfo(infoMessages(user.email, 'elimino', 'todos los', 'rooms'));
		res.json({
			deleteAll: true,
		});
	} catch (error) {
		logError(error);
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

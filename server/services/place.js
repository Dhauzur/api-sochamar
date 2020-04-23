import Place from '../models/place';
import Lodging from '../models/lodging';
import { logError, logInfo } from '../config/pino';
import { createdResponse } from '../utils/responses/createdResponse';
import { infoMessages } from '../utils/logger/infoMessages';

const getOne = async (user, placeId, res) => {
	try {
		const place = await Place.findOne({
			_id: placeId,
			users: { $in: user._id },
		});
		logInfo(infoMessages(user.email, 'obtuvo', 'place'));
		res.json({
			status: true,
			place,
		});
	} catch (error) {
		logError(error);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const getAll = async (user, res) => {
	try {
		const place = await Place.find({ users: { $in: user._id } });
		const length = await Place.countDocuments({});
		logInfo(infoMessages(user.email, 'obtuvo', 'todos los', 'place'));
		res.json({
			status: true,
			place,
			length,
		});
	} catch (error) {
		logError(error);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const createOne = async (user, place, res) => {
	try {
		const newPlace = new Place(place);
		newPlace.users.push(user._id);
		const placeDB = await newPlace.save();
		logInfo(infoMessages(user.email, 'registro', 'un', 'place', placeDB));
		res.json({
			status: true,
			place: placeDB,
		});
	} catch (error) {
		logError(error);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const deleteOne = async (user, placeId, res) => {
	try {
		const place = await Place.findOne({
			_id: placeId,
			users: { $in: user._id },
		});
		const deletedPlace = await Place.findOneAndRemove({ _id: placeId });
		const lodging = await Lodging.deleteMany({ place: placeId });
		logInfo(
			infoMessages(user.email, 'elimino', 'un', 'place', deletedPlace)
		);
		res.json({
			delete: place.name,
			lodgins: lodging.deletedCount,
		});
	} catch (error) {
		logError(error);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const createService = async (user, placeId, service, res) => {
	try {
		const place = await Place.findOne({
			_id: placeId,
			users: { $in: user._id },
		});

		const nameExist = checkIfServiceNameExist(place.services, service.name);
		if (nameExist) return res.sendStatus(409);

		place.services.push(service);
		const savedPlace = await place.save();
		//Nuestro nuevo servicio siempre se encontrara en la ultima posición del arreglo
		const lastIndex = savedPlace.services.length - 1;
		const newService = savedPlace.services[lastIndex];
		logInfo(
			infoMessages(user.email, 'registro', 'un', 'place Service', service)
		);
		createdResponse('service', newService, res);
	} catch (error) {
		logError(error);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const updateService = async (user, placeId, serviceId, service, res) => {
	try {
		const place = await Place.findOne({
			_id: placeId,
			users: { $in: user._id },
		});
		const foundService = place.services.id({ _id: serviceId });
		foundService.set(service);
		await place.save();
		logInfo(
			infoMessages(
				user.email,
				'actualizo',
				'un',
				'place Service',
				foundService
			)
		);
		return res.sendStatus(200);
	} catch (error) {
		logError(error);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const deleteService = async (user, placeId, serviceId, res) => {
	try {
		const place = await Place.findOne({
			_id: placeId,
			users: { $in: user._id },
		});
		const test = place.services.id({ _id: serviceId }).remove();
		await place.save();
		logInfo(
			infoMessages(user.email, 'elimino', 'un', 'place Service', test)
		);
		return res.sendStatus(200);
	} catch (error) {
		logError(error);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const checkIfServiceNameExist = (services, name) => {
	const found = services.find(service => service.name === name);
	if (found) return true;
	else return false;
};

const deleteAll = async (user, res) => {
	try {
		await Place.deleteMany({ users: { $in: user._id } });
		logInfo(infoMessages(user.email, 'elimino', 'todo los', 'place'));
		res.json({
			status: true,
		});
	} catch (error) {
		logError(error);
		return res.status(400).json({ status: false, error: error.message });
	}
};

const getPlacesIds = async user => {
	try {
		const place = await Place.find({ users: { $in: user._id } });
		return place.map(place => place._id);
	} catch (error) {
		logError(error);
	}
};

const searchOneWithId = async placeId => {
	return await Place.findById(placeId);
};
const placeService = {
	getOne,
	getAll,
	createOne,
	deleteOne,
	createService,
	updateService,
	deleteService,
	deleteAll,
	getPlacesIds,
	searchOneWithId,
};

export default Object.freeze(placeService);

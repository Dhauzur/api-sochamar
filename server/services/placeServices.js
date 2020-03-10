import Place from '../models/place';
import PlaceServices from '../models/placeServices';
import { logError } from '../config/pino';
import { errorResponse } from '../utils/responses/errorResponse';
import { createdResponse } from '../utils/responses/createdResponse';
import { getResponse } from '../utils/responses/getResponse';

const createOne = async (service, res) => {
	const newService = new PlaceServices(service);
	try {
		const result = await newService.save();
		const place = await Place.findById(result.placeId);
		place.services.push(result._id);
		await place.save();
		createdResponse('placeService', result, res);
	} catch (e) {
		logError(e.message);
		errorResponse(e, res);
	}
};
const updateOne = async (id, service, res) => {
	try {
		const updated = await PlaceServices.findByIdAndUpdate(id, service);
		res.status(201).send({ status: true, placeService: updated });
	} catch (e) {
		logError(e);
		errorResponse(e, res);
	}
};
const getAll = async (placeId, res) => {
	try {
		const placeServices = await PlaceServices.find({ placeId });
		getResponse('placeServices', placeServices, res);
	} catch (e) {
		logError(e);
		errorResponse(e, res);
	}
};
const getOne = async (id, res) => {
	try {
		const found = await PlaceServices.findById(id);
		if (!found) return res.sendStatus(409);
		getResponse('placeService', found, res);
	} catch (e) {
		logError(e.message);
		errorResponse(e, res);
	}
};
const deleteOne = async (serviceId, res) => {};
const deleteAll = async (placeId, res) => {};

const placeServicesService = {
	getAll,
	getOne,
	updateOne,
	deleteOne,
	createOne,
	deleteAll,
};

export default Object.freeze(placeServicesService);

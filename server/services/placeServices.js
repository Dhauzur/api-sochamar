import placeServices from '../models/placeServices';

const createOne = (placeId, service, res) => {
	res.sendStatus(201);
};
const updateOne = (serviceId, service, res) => {
	res.sendStatus(201);
};
const deleteOne = (serviceId, res) => {};
const getAll = (placeId, res) => {};
const deleteAll = (placeId, res) => {};

const placeServicesService = {
	getAll,
	updateOne,
	deleteOne,
	createOne,
	deleteAll,
};

export default Object.freeze(placeServicesService);

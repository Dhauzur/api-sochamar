import placeServices from '../services/placeServices';

const placeServicesController = {
	getAll(req, res) {
		const { placeId } = req.params;
		placeServices.getAll(placeId, res);
	},
	getOne(req, res) {
		const { id } = req.params;
		placeServices.getOne(id, res);
	},
	createOne(req, res) {
		const service = req.body;
		placeServices.createOne(service, res);
	},
	updateOne(req, res) {
		const { id } = req.params;
		const service = req.body;
		placeServices.updateOne(id, service, res);
	},
	deleteOne(req, res) {
		const { id } = req.params;
		placeServices.deleteOne(id, res);
	},
	deleteAll(req, res) {
		placeServices.deleteAll(res);
	},
};

export default Object.freeze(placeServicesController);

import placeService from '../services/place';

const placeController = {
	getOne(req, res) {
		const { user } = req;
		const placeId = req.params.id;
		placeService.getOne(user._id, placeId, res);
	},
	getAll(req, res) {
		const { user } = req;
		placeService.getAll(user._id, res);
	},
	create(req, res) {
		const { user } = req;
		const place = req.body;
		placeService.createOne(user._id, place, res);
	},
	createService(req, res) {
		const { user } = req;
		const { id } = req.params;
		const service = req.body;
		placeService.createService(user._id, id, service, res);
	},
	updateService(req, res) {
		const { user } = req;
		const { id, serviceId } = req.params;
		const service = req.body;
		placeService.updateService(user._id, id, serviceId, service, res);
	},
	deleteService(req, res) {
		const { user } = req;
		const { id, serviceId } = req.params;
		placeService.deleteService(user._id, id, serviceId, res);
	},
	deleteAll(req, res) {
		const { user } = req;
		placeService.deleteAll(user._id, res);
	},
	deleteOne(req, res) {
		const { user } = req;
		const placeId = req.params.id;
		placeService.deleteOne(user._id, placeId, res);
	},
};

export default Object.freeze(placeController);

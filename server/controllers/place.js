import placeService from '../services/place';

const placeController = {
	getOne(req, res) {
		const { user } = req;
		const placeId = req.params.id;
		placeService.getOne(user, placeId, res);
	},
	getAll(req, res) {
		const { user } = req;
		placeService.getAll(user, res);
	},
	create(req, res) {
		const { user } = req;
		const place = req.body;
		placeService.createOne(user, place, res);
	},
	createService(req, res) {
		const { user } = req;
		const { id } = req.params;
		const service = req.body;
		placeService.createService(user, id, service, res);
	},
	updateService(req, res) {
		const { user } = req;
		const { id, serviceId } = req.params;
		const service = req.body;
		placeService.updateService(user, id, serviceId, service, res);
	},
	deleteService(req, res) {
		const { user } = req;
		const { id, serviceId } = req.params;
		placeService.deleteService(user, id, serviceId, res);
	},
	deleteAll(req, res) {
		const { user } = req;
		placeService.deleteAll(user, res);
	},
	deleteOne(req, res) {
		const { user } = req;
		const placeId = req.params.id;
		placeService.deleteOne(user, placeId, res);
	},
};

export default Object.freeze(placeController);

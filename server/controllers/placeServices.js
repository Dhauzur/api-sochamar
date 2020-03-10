import placeServices from '../services/placeServices';

const placeServicesController = {
	getAll(req, res) {
		placeServices.getAll(res);
	},
	createOne(req, res) {
		const service = req.body;
		placeServices.createOne(1, service, res);
	},
	updateOne(req, res) {
		const service = req.body;
		placeServices.updateOne(1, service, res);
	},
	deleteOne(req, res) {
		const report = req.body;
		placeServices.deleteOne(report, res);
	},
	deleteAll(req, res) {
		placeServices.deleteAll(res);
	},
};

export default Object.freeze(placeServicesController);

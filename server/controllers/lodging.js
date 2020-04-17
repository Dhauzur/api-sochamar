import lodgingService from '../services/lodging';

const lodgingController = {
	getAll(req, res) {
		const { user } = req;
		lodgingService.getAll(user, res);
	},
	create(req, res) {
		const { user } = req;
		const lodging = req.body;
		lodgingService.createOne(user, lodging, res);
	},
	deleteAll(req, res) {
		const { user } = req;
		lodgingService.deleteAll(user, res);
	},
	getAllForPlace(req, res) {
		const { user } = req;
		lodgingService.getAllForPlace(user, req, res);
	},
	deleteAllWithPlace(req, res) {
		const { user } = req;
		lodgingService.deleteAllWithPlace(user, req, res);
	},
	deleteOneWithPlaceId(req, res) {
		const { user } = req;
		lodgingService.deleteOneWithPlaceId(user, req, res);
	},

	generatePdfReport(req, res) {
		const { placeId } = req.params;
		const { user } = req;
		lodgingService.generatePdfReport(user, placeId, res);
	},
};

export default Object.freeze(lodgingController);

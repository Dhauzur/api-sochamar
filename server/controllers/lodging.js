import lodgingService from '../services/lodging';

const lodgingController = {
	getAll(req, res) {
		lodgingService.getAll(res);
	},
	create(req, res) {
		lodgingService.createOne(req, res);
	},
	deleteAll(req, res) {
		lodgingService.deleteAll(res);
	},
	getAllForPlace(req, res) {
		lodgingService.getAllForPlace(req, res);
	},
	deleteAllWithPlace(req, res) {
		lodgingService.deleteAllWithPlace(req, res);
	},
	deleteOneWithPlaceId(req, res) {
		lodgingService.deleteOneWithPlaceId(req, res);
	},
};

export default Object.freeze(lodgingController);

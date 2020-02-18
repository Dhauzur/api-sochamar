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
	getAllForCompany(req, res) {
		lodgingService.getAllForCompany(req, res);
	},
	deleteAllWithCompany(req, res) {
		lodgingService.deleteAllWithCompany(req, res);
	},
	deleteOneWithCompanyId(req, res) {
		lodgingService.deleteOneWithCompanyId(req, res);
	},
};

export default Object.freeze(lodgingController);

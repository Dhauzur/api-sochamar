const lodgingService = require('../services/lodging');

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
	deleteAllWithCompany(req, res) {
		lodgingService.deleteAllWithCompany(req, res);
	},
	deleteOneWithCompanyId(req, res) {
		lodgingService.deleteOneWithCompanyId(req, res);
	},
};

module.exports = Object.freeze(lodgingController);

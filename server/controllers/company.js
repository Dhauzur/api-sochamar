const companyService = require('../services/company');

const companyController = {
	getOne(req, res) {
		companyService.getOne(req, res);
	},
	getAll(req, res) {
		companyService.getAll(res);
	},
	create(req, res) {
		companyService.createOne(req, res);
	},
	deleteAll(req, res) {
		companyService.deleteAll(res);
	},
	deleteOne(req, res) {
		companyService.deleteOne(req, res);
	},
};

module.exports = Object.freeze(companyController);

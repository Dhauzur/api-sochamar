import companyService from '../services/company';

const companyController = {
	getOne(req, res) {
		const { user } = req;
		const companyId = req.params.id;
		companyService.getOne(user._id, companyId, res);
	},
	getAll(req, res) {
		const { user } = req;
		companyService.getAll(user._id, res);
	},
	create(req, res) {
		const { user } = req;
		const company = req.body;
		companyService.createOne(user._id, company, res);
	},
	deleteAll(req, res) {
		const { user } = req;
		companyService.deleteAll(user._id, res);
	},
	deleteOne(req, res) {
		const { user } = req;
		const companyId = req.params.id;
		companyService.deleteOne(user._id, companyId, res);
	},
};

export default Object.freeze(companyController);

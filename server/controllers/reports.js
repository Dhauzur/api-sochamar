import reportsService from '../services/reports';

const reportsController = {
	getAll(req, res) {
		reportsService.getAll(res);
	},
	create(req, res) {
		const { body } = req;
		reportsService.createOne(body, res);
	},
	deleteAll(req, res) {
		reportsService.deleteAll(res);
	},
};

export default Object.freeze(reportsController);

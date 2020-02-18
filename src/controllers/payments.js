import paymentsService from '../services/payments';

/**
 * controller for passengers
 */
const paymentsController = {
	create(req, res) {
		paymentsService.createOne(req, res);
	},
	getAll(req, res) {
		paymentsService.getAll(req, res);
	},
	editOne(req, res) {
		paymentsService.editOne(req, res);
	},
	deleteOne(req, res) {
		paymentsService.deleteOne(req, res);
	},
};

export default Object.freeze(paymentsController);

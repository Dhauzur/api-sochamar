import paymentsService from '../services/payments';

/**
 * controller for payments
 */
const paymentsController = {
	create(req, res) {
		const { file } = req;
		const payment = req.body;
		paymentsService.createOne(payment, file, res);
	},
	getAll(req, res) {
		paymentsService.getAll(req, res);
	},
	editOne(req, res) {
		const { id } = req.params;
		const comments = req.body;

		paymentsService.editOne(id, comments, res);
	},
	deleteOne(req, res) {
		paymentsService.deleteOne(req, res);
	},
};

export default Object.freeze(paymentsController);

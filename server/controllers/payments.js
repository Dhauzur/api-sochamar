import paymentsService from '../services/payments';

/**
 * controller for payments
 */
const paymentsController = {
	create(req, res) {
		const { user } = req;
		const { file } = req;
		const payment = req.body;
		paymentsService.createOne(user, payment, file, res);
	},
	getAll(req, res) {
		const { user } = req;
		paymentsService.getAll(user, req, res);
	},
	editOne(req, res) {
		const { user } = req;
		const { id } = req.params;
		const comments = req.body;

		paymentsService.editOne(user, id, comments, res);
	},
	deleteOne(req, res) {
		const { user } = req;
		paymentsService.deleteOne(user, req, res);
	},
};

export default Object.freeze(paymentsController);

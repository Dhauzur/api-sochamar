import paymentsService from '../services/payments';

/**
 * controller for payments
 */
const paymentsController = {
	create(req, res) {
		const { body } = req;
		const { file } = req;
		paymentsService.createOne(body, file, res);
	},
	getAll(req, res) {
		paymentsService.getAll(req, res);
	},
	editOne(req, res) {
		const { id } = req.params;
		const { body } = req;
		const { file } = req;
		paymentsService.editOne(id, body, body.comments, file, res);
	},
	deleteOne(req, res) {
		paymentsService.deleteOne(req, res);
	},
};

export default Object.freeze(paymentsController);

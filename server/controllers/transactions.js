import transactionService from '../services/transactions';

const transactionController = {
	handleMercadoPagoNotification(req, res) {
		res.sendStatus(201);
		//mercadoPago have two possible query values in notificationId/notificationType
		const notificationId = req.query.id || req.query['data.id'];
		const notificationType = req.query.topic || req.query.type;
		const { body } = req;

		transactionService.handleMercadoPagoNotification(
			notificationId,
			notificationType,
			body
		);
	},
	startMercadoPagoTransaction(req, res) {
		const { user } = req;
		const { body } = req;
		const { unlockId } = req.params;
		transactionService.startMercadoPagoTransaction(
			user,
			body,
			unlockId,
			res
		);
	},
};

export default transactionController;

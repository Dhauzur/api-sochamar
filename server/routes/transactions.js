import { Router } from 'express';
import transactionController from '../controllers/transactions';

const transactionsRouter = Router();

transactionsRouter.post(
	'mercadopago/notifications',
	transactionController.handleMercadoPagoNotification
);

export default transactionsRouter;

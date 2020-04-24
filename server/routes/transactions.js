import { Router } from 'express';
import transactionController from '../controllers/transactions';

const transactionsRouter = Router();

transactionsRouter.post(
	'mercadopago/notifications',
	transactionController.handleMercadoPagoNotification
);

transactionsRouter.post(
	'mercadopago/unlock/:unlockId/transaction/start',
	transactionController.startMercadoPagoTransaction
);
export default transactionsRouter;

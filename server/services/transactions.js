import mercadoPagoService from './mercadopago';
import { errorCallback } from '../utils/functions/errorCallback';

//We finish the transaction updating our transaction model here
const finishTransactions = async (paymentStatus, transactionId) => {
	console.log(paymentStatus);
	console.log(transactionId);
};
//first transform the payments status to integer, then finish the transactions updating the collection
const managePaymentTransaction = async (payment, res) => {
	try {
		const dbStatus = mercadoPagoService.transformMercadoPagoStatus(
			payment.status
		);

		await finishTransactions(dbStatus, payment.external_reference);
	} catch (e) {
		errorCallback(e, res);
	}
};

const managePaymentNotification = async (paymentId, res) => {
	try {
		const paymentData = await mercadoPagoService.getPaymentData(paymentId);
		await managePaymentTransaction(paymentData, res);
	} catch (e) {
		errorCallback(e, res);
	}
};

const handleChargeBackNotification = async (chargeBackId, res) => {
	try {
		const chargeBack = await mercadoPagoService.getChargeBackData(
			chargeBackId
		);
		//if a chargeback appears on certain payment, we need to change our user unlock state and change the payment status too
	} catch (e) {
		errorCallback(e, res);
	}
};

const handleMerchantOrderNotification = () => {};

const handleMercadoPagoNotification = async (
	notificationId,
	notificationType
) => {
	switch (notificationType) {
		case 'payment':
			await managePaymentNotification(notificationId);
			break;
		case 'chargeback':
			await handleChargeBackNotification(notificationId);
			break;
		case 'merchant_order':
			handleMerchantOrderNotification();
			break;
		default:
			break;
	}
};

const transactionService = { handleMercadoPagoNotification };

export default transactionService;
